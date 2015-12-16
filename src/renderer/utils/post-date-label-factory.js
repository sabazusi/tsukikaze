class PostDateLabelFactory {
    constructor() {
    }

    create(date) {
        // calc post time diff sec(int).
        let diff = 100;
        let label = "date-string"; 

        if (diff <= 30) {
            label = "ついさっき";
        } else if (diff < 60) {
            label = diff + "秒";
        } else if (diff < 60 * 60) {
            label = Math.floor(diff/60) + "分";
        } else if (diff < 60 * 60 * 24) {
            label = Math.floor(diff/60*60*24) + "時間";
        }
        return label;
    }
}

export default new PostDateLabelFactory();
