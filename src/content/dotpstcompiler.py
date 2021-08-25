import json
from pprint import pprint

import os
import sys


###### TEMP VARIABLES ######
CURRENT_POST = None

###### Content types ######


def paragraph(text):
    data = {}
    data["type"] = "p"
    data["text"] = text
    return data


def container(title, content, collapse, show):
    if(title == None and content == []):
        return
    data = {}
    data["title"] = title
    data["content"] = content
    data["type"] = "container"
    data["collaps"] = collapse
    data["show"] = show

    return data


def post(postnumber):
    data = {}
    data["type"] = "post"
    data["post"] = postnumber
    return data


def unordered_list(lines):
    data = {}
    data["type"] = "ul"
    data["items"] = lines
    return data


def ordered_list(lines):
    data = {}
    data["type"] = "ol"
    data["items"] = lines
    return data


def latex(lines):
    data = {}
    data["type"] = "latex"
    data["items"] = [" ".join(lines)]
    return data


def downloads(lines):
    data = {}
    data["type"] = "downloads"
    data["items"] = lines
    return data


def compile_buffer(buffer, buffer_type, alignment):

    res = None

    if(buffer_type == "text"):
        res = paragraph("\n".join(buffer))
    elif(buffer_type == "ul"):
        res = unordered_list(buffer)
    elif(buffer_type == "ol"):
        res = ordered_list(buffer)
    elif(buffer_type == "latex"):
        res = latex(buffer)
    elif(buffer_type == "downloads"):
        res = downloads(buffer)

    if alignment:
        res["alignment"] = alignment

    return res

###### File compiling ######


def read_pst(path):
    with open(path, 'r', encoding="utf-8") as f:
        arr = []
        for l in f:
            arr.append(l)
        arr.append('')

        words = arr[0].split(";")

        commands = ("!!! ^^^ >> >1").split(" ")
        word_count = len([x for x in " ".join(arr[1:]).split(
            " ") if (x not in commands and x != len(x) * '#' and x != " ")])

        title = words[0].strip()

        if(title[:3] == "!!!"):
            return

        key = words[1].strip()

        res = workWithSubText(arr, 1, len(arr), title, True, False)
        res["wordCount"] = word_count
        res["key"] = key

        del res["type"]

        if(len(words) > 2):
            definitions = words[2].strip()
            definitions = definitions.strip()[1:-1].split(',')
            res["languages"] = [x.strip() for x in definitions]

        if(len(words) > 3):
            hashtags = [x.strip() for x in words[3].strip().split("#")]

            res["hashtags"] = [x for x in hashtags if x != ""]

        if(len(words) > 4):
            date = words[4].strip()
            res["date"] = date

        return {
            "res": res,
            "key": key
        }


def workWithSubText(f, a, b, TIT=None, initialCall=False, collapse=False, show=False):
    level = None
    lastpart = a
    last_title = None
    result = []
    collapse = collapse
    last_collapse = False
    show = show
    last_show = False

    text = []

    if(a == b):
        return
    for i in range(a, b):
        l = f[i]

        words = l.split(" ")

        if(len(words) > 0):
            # Getting titles
            if(words[0][0] == "#" if len(words[0]) > 0 else False):
                title = " ".join(words[1:]).replace("\n", " ").strip()

                appendContent = False

                currentLevel = words[0].count("#")

                current_collapse = False
                current_show = False

                if("v" in words[0]):
                    current_collapse = True
                    current_show = True
                elif("^" in words[0]):
                    current_collapse = True
                    current_show = False

                if not level:
                    level = currentLevel
                    appendContent = True
                else:
                    if(currentLevel == level):
                        appendContent = True
                if(appendContent):
                    content = workWithSubText(
                        f, lastpart, i, last_title, False, last_collapse, last_show)
                    if(content):
                        result.append(content)
                    last_title = title
                    last_show = current_show
                    last_collapse = current_collapse
                    lastpart = i + 1
                    text = []
            else:
                text.append(l.replace('\n', ''))

    # If the last bulk compiled paragraph isn't the end of file, compile everything in the buffer
    # Every information other than the title flows through this if
    if(lastpart != b):
        # If there is a title above, compile this paragraph with that title
        if(last_title):
            content = workWithSubText(
                f, lastpart, b, last_title, False, last_collapse, last_show)
            result.append(content)
        # Otherwise compile it line by line (We are in the pure content branch - meaning there are no more titles, this is the bottom of the recursion)
        else:
            # Buffer that holds the content
            buffer = []
            # Type of the buffer (text, ul, ol, latex)
            buffer_type = ""

            alignment = ""

            for l in text:
                words = l.split(' ')

                # Find portals
                if(words[0] == "^^^"):
                    # If there is text in the buffer, that is not yet compiled, add it as paragraph
                    if(len(buffer) != 0):
                        result.append(compile_buffer(
                            buffer, buffer_type, alignment))
                        buffer = []

                    # append this line as a portal
                    buffer_type = ""
                    result.append(post(words[1]))

                # Unordered list
                elif(words[0] == ">>"):
                    # If there is text in the buffer, that is not yet compiled, add it as paragraph
                    if(len(buffer) != 0 and buffer_type != "ul"):
                        result.append(compile_buffer(
                            buffer, buffer_type, alignment))
                        buffer = []

                    buffer_type = "ul"
                    buffer.append(" ".join(words[1:]))

                # Ordered list
                elif(words[0] == ">1"):
                    # If there is text in the buffer, that is not yet compiled, add it as paragraph
                    if(len(buffer) != 0 and buffer_type != "ol"):
                        result.append(compile_buffer(
                            buffer, buffer_type, alignment))
                        buffer = []

                    buffer_type = "ol"
                    buffer.append(" ".join(words[1:]))
                # Alignemtn
                elif(words[0] in ["([>", "([><", "([<", "([<>", "([r"]):

                    if(len(buffer) != 0 and buffer_type != "latex"):
                        result.append(compile_buffer(
                            buffer, buffer_type, alignment))
                        buffer = []
                        buffer_type = ""

                    alignments = {
                        "([>": "right",
                        "([><": "center",
                        "([<": "left",
                        "([<>": "",
                        "([r": ""
                    }
                    alignment = alignments[words[0]]
                elif(words[0] == "$VV$"):
                    # If there is text in the buffer, that is not yet compiled, add it as paragraph
                    if(len(buffer) != 0 and buffer_type != "downloads"):
                        result.append(compile_buffer(
                            buffer, buffer_type, alignment))
                        buffer = []
                    buffer_type = "downloads"
                    buffer.append(" ".join(words[1:]))
                # Latex
                elif(words[0] == "///" or buffer_type == "latex"):
                    # If there is text in the buffer, that is not yet compiled, add it as paragraph
                    if(len(buffer) != 0 and buffer_type != "latex"):
                        result.append(compile_buffer(
                            buffer, buffer_type, alignment))
                        buffer = []
                    if (words[0] == "///"):
                        if buffer_type == "latex":
                            result.append(compile_buffer(
                                buffer, buffer_type, alignment))
                            buffer = []
                            buffer_type = ""
                        else:
                            buffer_type = "latex"
                    else:
                        buffer.append(" ".join(words))

                # Else if the text in the line is raw text, append it into raw text buffer
                else:
                    if(len(buffer) != 0 and buffer_type != "text"):
                        result.append(compile_buffer(
                            buffer, buffer_type, alignment))
                        buffer = []
                    buffer_type = "text"
                    buffer.append(l)

            if(len(buffer) != 0):
                result.append(compile_buffer(buffer, buffer_type, alignment))

            # If there is only single record in the content, don't send back container, but the record itself (if not initial call - so the post doesn't have content type attributes like text or items)
            if(len(result) == 1 and not initialCall):
                temp = result[0]
                temp["title"] = TIT
                temp["collaps"] = collapse
                temp["show"] = show
                return temp
    return container(TIT, result, collapse, show)


def file_len(f):
    res = 0

    for i, l in enumerate(f):
        res = i
    return res


###### Implementation ######

files = os.listdir("posts")

result = {}

for f in files:
    CURRENT_POST = f[:-4]
    post_compiled = read_pst("posts/"+f)

    if(post_compiled != None):
        result[post_compiled["key"]] = post_compiled["res"]


data = {"posts": {}}

for key in result:
    data['posts'][key] = result[key]

# Sections
sections = {}
keys = [key for key in data['posts']]

with open('sections.json', 'r') as sections_file:
    sections_json = json.load(sections_file)

    for section in sections_json['sections']:
        empty = True
        functioning_posts = []
        for key in sections_json['sections'][section]['posts']:
            if key in keys:
                keys.remove(key)
                data['posts'][key]['section'] = section
                functioning_posts.append(key)
                empty = False
        if not empty:
            sections[section] = sections_json['sections'][section]
            sections[section]['posts'] = functioning_posts
    if keys != []:
        sections['misc'] = {
            "title": "Misc.",
            "posts": keys
        }

data['sections'] = sections

with open('posts.json', 'w') as outfile:
    json.dump(data, outfile)
