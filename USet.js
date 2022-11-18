class USet {
    constructor() {
        this.array = [];
        this.size = 0;
    }

    // Similar to a standard Set() but uses equals() to determine unique elements
    add(a) {
        for (var e of this.array) {
            if (e.equals(a)) {
                return false;
            }
        }
        this.array.push(a);
        this.size += 1;
        return true;
    }

    [Symbol.iterator]() {
        return this.array.values();
    }
}