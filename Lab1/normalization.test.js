import { isEquals, mergeMapsOfRecords } from "./normalization";

describe("normalization helpers", () => {
  describe("isEquals", () => {
    it.each([
      [false, false],
      [true, true],
      [null, null],
      ["test", "test"],
      [0, 0],
      [1, 1],
      [1.1, 1.1],
      [{}, {}],
      [[], []],
      [[1], [1]],
      [[{}], [{}]],
      [[{ a: 1 }], [{ a: 1 }]],
      [{ a: 1 }, { a: 1 }],
      [{ a: [] }, { a: [] }],
      [{ a: [{ a: 1 }] }, { a: [{ a: 1 }] }],
    ])("should return true for isEqual(%s, %s)", (arg1, arg2) =>
      expect(isEquals(arg1, arg2)).toEqual(true)
    );

    it.each([
      [false, true],
      [true, false],
      [null, true],
      ["test1", "test2"],
      [0, 1],
      [null, 0],
      [1.1, 1.12],
      [{ a: 0 }, { a: 1 }],
      [[1], [2]],
      [[0], [1]],
      [[{ a: 0 }], [{ a: 1 }]],
      [[{ a: 1 }], [{ a: 2 }]],
      [{ a: [{ a: 1 }] }, { a: [{ a: 2 }] }],
    ])("should return false for isEqual(%s, %s)", (arg1, arg2) =>
      expect(isEquals(arg1, arg2)).toEqual(false)
    );
  });

  describe("mergeMapsOfRecords", () => {
    const mapA = {
      1: { id: 1, name: "a", additionalData: "more data!" },
      2: { id: 2, name: "b" },
      4: { array: [], name: "test4", id: 4 },
      5: { moreArrays: [1, 2, 3] },
      6: { yes: true },
      7: { no: false },
      8: { someArray: null },
      9: { anotherArray: "something" },
      12: { anotherArray: [] },
      10: { objectOrNot: "definitely not" },
      11: { notOrObject: { x: "y" } },
      111: null,
    };
    const mapB = {
      1: { id: 1, name: "z" },
      3: { id: 3, name: "c", additionalData: "more data!" },
      5: { moreArrays: [{ 1: {}, 2: {} }] },
      4: { followings: true, array: ["test"] },
      6: { yes: null },
      7: { no: null },
      8: { someArray: ["test"] },
      9: { anotherArray: ["something"] },
      12: { anotherArray: null },
      10: { objectOrNot: { x: "y" } },
      11: { notOrObject: "string" },
      999: { test: "test" },
    };

    const expectedResult = {
      1: { id: 1, name: "z", additionalData: "more data!" },
      2: { id: 2, name: "b" },
      3: { id: 3, name: "c", additionalData: "more data!" },
      4: { array: ["test"], name: "test4", id: 4, followings: true },
      5: { moreArrays: [{ 1: {}, 2: {} }] },
      6: { yes: null },
      7: { no: null },
      8: { someArray: ["test"] },
      9: { anotherArray: ["something"] },
      10: { objectOrNot: { x: "y" } },
      11: { notOrObject: "string" },
      12: { anotherArray: null },
      111: null,
      999: { test: "test" },
    };

    it("should deep merge right two maps when both contain data", () => {
      expect(mergeMapsOfRecords(mapA, mapB)).toStrictEqual(expectedResult);
    });

    it("should return the same when nothing is on the left", () => {
      expect(mergeMapsOfRecords(null, mapB)).toStrictEqual(mapB);
      expect(mergeMapsOfRecords(undefined, mapB)).toStrictEqual(mapB);
      expect(mergeMapsOfRecords({}, mapB)).toStrictEqual(mapB);
    });

    it("should return the same when nothing is on the right", () => {
      expect(mergeMapsOfRecords(mapA, null)).toStrictEqual(mapA);
      expect(mergeMapsOfRecords(mapA, undefined)).toStrictEqual(mapA);
      expect(mergeMapsOfRecords(mapA, {})).toStrictEqual(mapA);
    });

    it("should return empty object when same when both are empty", () => {
      expect(mergeMapsOfRecords(null, null)).toStrictEqual({});
      expect(mergeMapsOfRecords(undefined, undefined)).toStrictEqual({});
    });

    it("should return the same reference when one side it empty", () => {
      expect(mergeMapsOfRecords(null, mapB)).toBe(mapB);
      expect(mergeMapsOfRecords(mapA, null)).toBe(mapA);
    });

    it("should return the same left reference when right one is deeply equal", () => {
      const l = {
        sameRecord: { id: 1, name: "a", ar: [1, 2, 3] },
      };
      const r = {
        sameRecord: { id: 1, name: "a", ar: [1, 2, 3] },
      };

      const comparator = {
        ar: isEquals,
      };

      const resultReference = mergeMapsOfRecords(l, r, comparator).sameRecord
        .ar;
      const leftReference = l.sameRecord.ar;

      expect(resultReference).toBe(leftReference);
    });

    it("should call provided comparator", () => {
      const l = {
        sameRecord: { id: 1, name: "a", ar: [1, 2, 3] },
      };
      const r = {
        sameRecord: { id: 1, name: "a", ar: [1, 2, 3] },
      };

      const comparator = {
        ar: isEquals,
      };

      const spy = spyOn(comparator, "ar");
      mergeMapsOfRecords(l, r, comparator).sameRecord.ar;

      expect(spy).toHaveBeenCalled();
    });

    it("should not call provided comparator when provided comparator is not needed", () => {
      const l = {
        sameRecord: { id: 1, name: "a", ar: [1, 2, 3] },
      };
      const r = {
        sameRecord: { id: 1, name: "a", ar: [1, 2, 3] },
      };

      const comparator = {
        someNonExistentProperty: isEquals,
      };

      const spy = spyOn(comparator, "someNonExistentProperty");
      mergeMapsOfRecords(l, r, comparator).sameRecord.ar;

      expect(spy).not.toHaveBeenCalled();
    });

    it("should call provided comparator with correct arguments", () => {
      const l = {
        sameRecord: { id: 1, name: "a", ar: [1, 2, 3] },
      };
      const r = {
        sameRecord: { id: 1, name: "a", ar: [1, 2, 3] },
      };

      const comparator = {
        ar: isEquals,
      };

      const spy = spyOn(comparator, "ar");
      mergeMapsOfRecords(l, r, comparator).sameRecord.ar;

      expect(spy).toHaveBeenCalledWith(l.sameRecord.ar, r.sameRecord.ar);
    });
  });
});
