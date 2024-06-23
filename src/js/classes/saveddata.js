export class SavedData {
    score = 0;
    userId = 0;
    level = 0;
    setScore() {
        this.score += 1;
        if (this.score % 5 === 0) {
            this.incrementLevel();
        }
    }
    getScore() {
        return this.score;
    }

    setUserId(id) {
        this.userId = id;
    }

    getUserId() {
        return this.userId;
    }
    getLevel () {
        return this.level
    }
    incrementLevel(){
        this.level = this.level += 1
    }

}
