class ImageResizer {
    constructor() {
    }

    getImageSize(image) {
        return {
            width: image.width,
            height: image.height
        }
    }
}

export default new ImageResizer();