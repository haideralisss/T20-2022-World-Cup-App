export default class PtsTableTeam {
    constructor() {
        this.id = "";
        this.country = "";
        this.wins = 0;
        this.losses = 0;
        this.noResults = 0;
        this.runsFaced = 0;
        this.runsConceded = 0;
        this.oversBowled = 0;
        this.oversFaced = 0;
        this.group = "";
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setCountry(country) {
        this.country = country;
    }

    getCountry() {
        return this.country;
    }

    setWins(wins) {
        this.wins += Number(wins);
    }

    getWins() {
        return this.wins;
    }

    setLosses(losses) {
        this.losses += Number(losses);
    }

    getLosses() {
        return this.losses;
    }

    setNoResults(noResults) {
        this.noResults += Number(noResults);
    }

    getNoResults() {
        return this.noResults;
    }

    setRunsFaced(runsFaced) {
        this.runsFaced += Number(runsFaced);
    }

    setRunsConceded(runsConceded) {
        this.runsConceded += Number(runsConceded);
    }

    setOversBowled(oversBowled) {
        oversBowled = oversBowled.split('/')[0];
        if(oversBowled.includes('.')) {
            let remBalls = (Number(oversBowled.split('.')[1]) / 6).toFixed(2);
            oversBowled = Number(oversBowled.split('.')[0]) + remBalls;
            }
        this.oversBowled += Number(oversBowled);
    }

    setOversFaced(oversFaced) {
        oversFaced = oversFaced.split('/')[0];
        if(oversFaced.includes('.')) {
            let remBalls = (Number(oversFaced.split('.')[1]) / 6).toFixed(2);
            oversFaced = Number(oversFaced.split('.')[0]) + remBalls;
        }
        this.oversFaced += Number(oversFaced);
    }

    generateNRR() {
        return ((this.runsFaced / this.oversFaced) - (this.runsConceded / this.oversBowled)).toFixed(3);
    }

    generatePoints() {
        return ((this.wins * 2) + this.noResults);
    }

    getMatches() {
        return (this.wins + this.losses + this.noResults);
    }

    setGroup(group) {
        this.group = group;
    }

    getGroup() {
        return this.group;
    }
}