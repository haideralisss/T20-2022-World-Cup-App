export default class BowlStats {
    constructor() {
      this.innings = 0;
      this.wickets = 0;
      this.oversBowled = 0;
      this.runsConceded = 0;
      this.bestFigures = 0;
      this.economy = 0;
      this.average = 0;
      this.strikeRate = 0;
      this.threeWicketHauls = 0;
      this.lbw = 0;
      this.bowled = 0;
      this.catchOut = 0;
      this.stumpOut = 0;
    }
  
    // Getters and setters for each attribute
    getInnings() {
      return this.innings;
    }
  
    setInnings(innings) {
      this.innings = innings;
    }
  
    getWickets() {
      return this.wickets;
    }
  
    setWickets(wickets) {
      this.wickets += Number(wickets);
    }
  
    getOversBowled() {
      return this.oversBowled;
    }
  
    setOversBowled(oversBowled) {
        if(oversBowled.includes('.')) {
        let remBalls = (Number(oversBowled.split('.')[1]) / 6).toFixed(2);
        let oversBowled = Number(oversBowled.split('.')[0]) + remBalls;
        }
        this.oversBowled += Number(oversBowled);
    }
  
    getRunsConceded() {
      return this.runsConceded;
    }
  
    setRunsConceded(runsConceded) {
      this.runsConceded += Number(runsConceded);
    }
  
    getBestFigures() {
      return this.bestFigures;
    }
  
    setBestFigures(bestFigures) {
      this.bestFigures = bestFigures;
    }
  
    getEconomy() {
        if(this.oversBowled == 0)
            return "0.00";
      return (this.runsConceded / this.oversBowled).toFixed(2);
    }
  
    getAverage() {
        if(this.wickets == 0)
            return this.runsConceded;
      return (this.runsConceded / this.wickets).toFixed(2);
    }
  
    getStrikeRate() {
        let ballsF = this.oversBowled * 6;
        if(ballsF == 0)
            return "0.00";
        return ((this.runsConceded / ballsF) * 100).toFixed(2);
    }
  
    getThreeWicketHauls() {
      return this.threeWicketHauls;
    }
  
    setthreeWicketHauls(threeWicketHauls) {
      this.threeWicketHauls += threeWicketHauls;
    }
  
    getLbw() {
      return this.lbw;
    }
  
    setLbw(lbw) {
      this.lbw += lbw;
    }
  
    getBowled() {
      return this.bowled;
    }
  
    setBowled(bowled) {
      this.bowled += bowled;
    }
  
    getCatchOut() {
      return this.catchOut;
    }
  
    setCatchOut(catchOut) {
      this.catchOut += catchOut;
    }
  
    getStumpOut() {
      return this.stumpOut;
    }
  
    setStumpOut(stumpOut) {
      this.stumpOut += stumpOut;
    }
  }  