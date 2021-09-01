from typing import Callable, Dict, Generic, List, Optional, Tuple, TypeVar, Union
import re


        

StrPred = Callable[[str], bool]

def starts_with(start_str: str) -> StrPred: 
    def starts_with_pred(line: str) -> bool: 
        return line.strip()[:len(start_str)] == start_str
    return starts_with_pred

def strpred_not(pred: StrPred) -> StrPred: 
    return lambda s: not pred(s)

def re_pattern(re_object) -> StrPred: 
    return lambda x: re_object.match(x)

def const_wrap(pred: StrPred) -> Callable[[str], StrPred]: 
    return lambda _: pred
  
JSON = Dict[str, Union['JSON', str, int, List['JSON']]]


class Parser:
    def __init__(self, lines: List[str]):
        self.reset_settings()
        self._lines = lines 
        self._line_index = 0
        self._stop_at = Optional[StrPred]

    def reset_settings(self):
        self.alignment = 'left'

    def pop(self) -> Optional[str]: 
        if self._line_index >= len(self._lines): 
            return None
        res = self._lines[self._line_index]
        if self._stop_at is not None and self._stop_at(res): 
            return None
        self._line_index += 1
        return res

    def peek(self) -> str: 
        return self._lines[self._line_index]

    def is_empty(self) -> bool: 
        return self._line_index == len(self._lines)

    def index(self) -> int: 
        return self._line_index


T = TypeVar('T')

class ParsingElement(Generic[T]): 

    def parse(self, parser: Parser) -> Tuple[Optional[T], Parser]:
        pass 

Compiler = Callable[[List[str]], JSON]
ParseRes = Tuple[Optional[T], Parser]

class LineBlock(ParsingElement[JSON]): 
    def __init__(self, start: StrPred, end: StrPred, compiler: Compiler): 
        self.start = start
        self.end = end
        self.compiler = compiler

    def parse(self, parser: Parser) -> ParseRes[JSON]:  
        line = parser.peek()
        parse_buffer = []
        if not self.start(line): 
            return None, parser
        parser.pop()
        while not self.end(parser.peek()): 
            parse_buffer.append(parser.peek())
            parser.pop()
        parser.pop()
        return self.compiler(parse_buffer), parser


def compile_latex(lines: List[str]) -> JSON: 
    data = {}
    data["type"] = "latex"
    data["items"] = [" ".join(lines)]
    return data

LatexBlock = LineBlock(starts_with('///'), starts_with('///'), compile_latex)


HEADER_PATTERN = re.compile(r'^\s*(##*)([\^v]?)(.*)$')

def get_header_level(line: str) -> int: 
    match = HEADER_PATTERN.match(line)
    if match is None: 
        return -1
    else: 
        return len(match.group(1))

def compile_container(title: str, content: List[JSON], collapse: bool, show: bool):
    if(title == None and content == []):
        return
    data = {}
    data["title"] = title
    data["content"] = content
    data["type"] = "container"
    data["collaps"] = collapse
    data["show"] = show

    return data

class HeaderBlock(ParsingElement[JSON]): 

    def __init__(self, compiler: Callable[[List[str]], List[JSON]]): 
        self.compiler = compiler

    def parse(self, parser: Parser) -> ParseRes[JSON]: 
        line = parser.peek()
        match = HEADER_PATTERN.match(line)
        if match is None: 
            return None, parser
        hashtags, collapse_symbol, title = match.groups()
        level = len(hashtags)
        collapse = collapse_symbol != ''
        show = not collapse or collapse_symbol == 'v'
        body = []
        parser.pop()

        while not parser.is_empty(): 
            current_level = get_header_level(parser.peek())
            if current_level != -1 and current_level <= level: 
                break 
            body.append(parser.pop())

        return compile_container(
            title, self.compiler(body), collapse, show), parser

def compile_paragraph(text):
    data = {}
    data["type"] = "p"
    data["text"] = text
    return data

SCOPE_PARSERS: List[ParsingElement] = [HeaderBlock()]

class Scope(ParsingElement[List[JSON]]): 

    def __init__(self, parser_elements: List[ParsingElement[JSON]]): 
        self.parser_elements = parser_elements

    def parse(self, parser: Parser) -> ParseRes[List[JSON]]: 
        components = []
        misc_text = [] 
        while not parser.is_empty(): 
            index = parser.index()
            for p_element in SCOPE_PARSERS: 
                res, parser = p_element.parse(parser)
                if res is None and parser.index() != index: 
                    raise RuntimeError('parse consumed input, but did not ' + 
                                       'produce output')
                if res is None: 
                    continue 
                if misc_text: 
                    components.append(compile_paragraph(misc_text))
                    misc_text = []
                components.append(res)
                break 
            if parser.index() == index: 
                misc_text.append(parser.pop())
        if misc_text: 
            components.append(compile_paragraph(misc_text))
        return components, parser 
        
if __name__ == "__main__":
    with open('test.pst') as f: 
        lines = list(map(lambda s: s.rstrip(), f.readlines()))
        scope = Scope([])
        scope.parser_elements.append(HeaderBlock(scope.parse))
        print(scope.parse(Parser(lines))[0])
