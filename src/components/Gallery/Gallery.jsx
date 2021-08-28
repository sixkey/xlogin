////// IMPORTS //////

//// EXTERNAL ////

// React
import ColumnAnimator from "components/ColumnAnimator/ColumnAnimator";
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container, Row, Col } from "reactstrap";
import GalleryItem from "./GalleryItem";

//// INTERNAL ////

////// COMPONENT //////

class Gallery extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////

    render() {
        const { items, columnsNumbers = { lg: 4, md: 3, sm: 2, xs: 2 } } = this.props;
        var columnCount = 12;
        var galleryItems = items.map((item, index) => (
            <Col
                key={index}
                className="py-3"
                lg={12 / columnsNumbers.lg}
                md={12 / columnsNumbers.md}
                sm={12 / columnsNumbers.sm}
                xs={12 / columnsNumbers.xs}
            >
                {this.getItem(item)}
            </Col>
        ));

        var rows = [];

        for (var i = 0; i < galleryItems.length; i += columnCount) {
            var row = [];
            for (
                var j = 0;
                j < columnCount && i + j < galleryItems.length;
                j++
            ) {
                row.push(galleryItems[i + j]);
            }
            rows.push(row);
        }

        return (
            <Container>
                <ColumnAnimator>
                    {rows.map((row, index) => (
                        <Row key={index}>
                            {row.map((galleryItem, index) => (
                                <Fragment key={index}>{galleryItem}</Fragment>
                            ))}
                        </Row>
                    ))}
                </ColumnAnimator>
            </Container>
        );
    }

    getItem = (item) => {
        const { itemFunction } = this.props;

        var finalItem = item;

        if (itemFunction) {
            finalItem = itemFunction(item);
        }

        if (!finalItem) {
            return null;
        }

        return (
            <GalleryItem
                className={"m-0 p-0"}
                logoClassName={finalItem.logoClassName}
                imageClassName={finalItem.imageClassName}
                src={finalItem.src}
                logoSrc={finalItem.logoSrc}
                link={finalItem.link}
                titleElem={finalItem.titleElem}
            ></GalleryItem>
        );
    };

    //// MISC ////
}

////// EXPORTS //////

export default Gallery;
