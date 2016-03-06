class ImageResizer {
    constructor() {
    }

    getModalImageSize(image) {
        let modalImageWidth = window.outerWidth * 0.9;
        let modalImageHeight = modalImageWidth / image.width * image.height;
        return {
            width: modalImageWidth,
            height: modalImageHeight,
            verticalMargin: (window.outerWidth - modalImageWidth) / 2,
            horizontalMargin: (window.outerHeight - modalImageHeight) / 2
        }
    }
}

export default new ImageResizer();