class ImageResizer {
    getModalImageSize(image, windowSize) {
        let modalImageWidth = windowSize.width * 0.9;
        let modalImageHeight = modalImageWidth / image.width * image.height;
        return {
            width: modalImageWidth,
            height: modalImageHeight,
            horizontalMargin: (windowSize.width - modalImageWidth) / 2,
            verticalMargin: (windowSize.height - modalImageHeight) / 2
        }
    }
}

export default new ImageResizer();