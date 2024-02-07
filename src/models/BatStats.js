export default class BatStats {
    constructor() {
      this.runs = 0;
      this.balls = 0;
      this.innings = 0;
      this.fours = 0;
      this.sixes = 0;
      this.average = 0;
      this.strikeRate = 0;
      this.fifties = 0;
      this.hundreds = 0;
      this.highestScore = 0;
      this.out = 0;
      this.lbw = 0;
      this.bowled = 0;
      this.stumped = 0;
      this.caughtOut = 0;
      this.runOut = 0;
      this.notOut = 0;
      this.mom = 0;
    }
  
    // Getters and setters for each attribute
    getRuns() {
        return this.runs;
    }
  
    setRuns(runs) {
        if(runs != null)
        this.runs += Number(runs);
    }
  
    getInnings() {
        return this.innings;
    }

    setInnings(innings) {
      this.innings = innings;
    }

    getBalls() {
      return this.balls;
    }
  
    setBalls(balls) {
        if(balls != null)
      this.balls += Number(balls);
    }
  
    getFours() {
      return this.fours;
    }
  
    setFours(fours) {
        if(fours != null)
      this.fours += Number(fours);
    }
  
    getSixes() {
      return this.sixes;
    }
  
    setSixes(sixes) {
        if(sixes != null)
      this.sixes += Number(sixes);
    }
  
    getAverage() {
        this.average = (this.runs / this.out).toFixed(2);
        if(this.out == 0)
            return this.runs;
      return this.average;
    }
  
    setOut(out) {
      this.out += Number(out);
    }
  
    getStrikeRate() {
        this.strikeRate = ((this.runs / this.balls) * 100).toFixed(2);
        if(this.strikeRate == null)
            return "0.00"
      return this.strikeRate;
    }
  
    getFifties() {
      return this.fifties;
    }
  
    setFifties(fifties) {
      this.fifties += fifties;
    }
  
    getHundreds() {
      return this.hundreds;
    }
  
    setHundreds(hundreds) {
      this.hundreds += hundreds;
    }
  
    getHighestScore() {
      return this.highestScore;
    }
  
    setHighestScore(highestScore) {
      this.highestScore = highestScore;
    }
  
    getNotOut() {
      return this.notOut;
    }
  
    setNotOut(notOut) {
      this.notOut += notOut;
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
  
    getStumped() {
      return this.stumped;
    }
  
    setStumped(stumped) {
      this.stumped += stumped;
    }
  
    getCaughtOut() {
      return this.caughtOut;
    }
  
    setCaughtOut(caughtOut) {
      this.caughtOut += caughtOut;
    }
  
    getRunOut() {
      return this.runOut;
    }
  
    setRunOut(runOut) {
      this.runOut += runOut;
    }

    getMom() {
        return this.mom;
      }
    
      setMom(mom) {
        this.mom += mom;
      }
  }