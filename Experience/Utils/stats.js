import StatsJs from "stats.js"

export default class Stats {
    constructor(active) {
        if (active) {
            this.rendererStats();
        }
    }

    rendererStats() {
        let stats = new StatsJs();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom);

        requestAnimationFrame(function loop() {
            stats.update();
            requestAnimationFrame(loop);
        })
    }
}
