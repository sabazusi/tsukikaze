class PostDateLabelFactory {
    constructor() {
    }

    create(date) {
        // calc post time diff sec(int).
        let diff = (new Date(Date.now()) - date) / 1000;
        let label = "date-string";

        if (diff <= 30) {
            label = "ついさっき";
        } else if (diff < 60) {
            label = diff + "秒";
        } else if (diff < 60 * 60) {
            label = Math.floor(diff/60) + "分";
        } else if (diff < 60 * 60 * 24) {
            label = Math.floor(diff/(60*60)) + "時間";
        } else if (diff < 60 * 60 * 24 * 365) {
            label = Math.floor(diff / (60 * 60 * 24)) + "日";
        } else {
            label = [
                date.getFullYear().toString(),
                date.getMonth().toString(),
                date.getDay().toString()
            ].join("/");
        }
        return label;
    }
}

export default new PostDateLabelFactory();
