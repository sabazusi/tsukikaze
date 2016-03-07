class ImageResizer {
    constructor() {
    }

    getModalImageSize(image, windowSize) {
        let modalImageWidth = windowSize.width * 0.9;
        let modalImageHeight = modalImageWidth / image.width * image.height;
        return {
            width: modalImageWidth,
            height: modalImageHeight,
            verticalMargin: (windowSize.width - modalImageWidth) / 2,
            horizontalMargin: (windowSize.height - modalImageHeight) / 2
        }
    }
}

export default new ImageResizer();