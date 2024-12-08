const { Goban } = require("../src");

describe("Goban.isTaken tests", () => {
    it("White stone is taken when surrounded by black", () => {
        const goban = new Goban([
            ".#.",
            "#o#",
            ".#.",
        ]);

        expect(goban.isTaken(1, 1)).toBe(true);
    });

    it("White stone is not taken when it has a liberty", () => {
        const goban = new Goban([
            "...",
            "#o#",
            ".#.",
        ]);

        expect(goban.isTaken(1, 1)).toBe(false);
    });

    it("Black shape is taken when surrounded", () => {
        const goban = new Goban([
            "oo.",
            "##o",
            "o#o",
            ".o.",
        ]);

        expect(goban.isTaken(0, 1)).toBe(true);
        expect(goban.isTaken(1, 1)).toBe(true);
        expect(goban.isTaken(1, 2)).toBe(true);
    });

    it("Black shape is not taken when it has a liberty", () => {
        const goban = new Goban([
            "oo.",
            "##.",
            "o#o",
            ".o.",
        ]);

        expect(goban.isTaken(0, 1)).toBe(false);
        expect(goban.isTaken(1, 1)).toBe(false);
        expect(goban.isTaken(1, 2)).toBe(false);
    });

    it("Square shape is taken", () => {
        const goban = new Goban([
            "oo.",
            "##o",
            "##o",
            "oo.",
        ]);

        expect(goban.isTaken(0, 1)).toBe(true);
        expect(goban.isTaken(0, 2)).toBe(true);
        expect(goban.isTaken(1, 1)).toBe(true);
        expect(goban.isTaken(1, 2)).toBe(true);
    });
});
