class ImageResizer {
    getModalImageSize(image, windowSize) {
        let maxWidth = windowSize.width * 0.9;
        let maxHeight = windowSize.height * 0.9;
        let resizeRate = Math.min(
            maxWidth / image.width,
            maxHeight / image.height
        );
        let modalImageWidth = image.width * resizeRate;
        let modalImageHeight = image.height * resizeRate;
        return {
            width: modalImageWidth,
            height: modalImageHeight,
            horizontalMargin: (windowSize.width - modalImageWidth) / 2,
            verticalMargin: (windowSize.height - modalImageHeight) / 2
        }
    }
}

export default new ImageResizer();