import { expect } from "chai";

describe("farm test suite 2", () => {
  let farm;

  beforeEach( () => {
    farm = new Farm(20);
  });

  it("should be able to get the size of the farm", () => {
    expect(farm.getSize()).to.equal(20);
  })

  it("should be able to add a small quantity of crops", () => {
    const result = farm.add(new Crop("badger", 1, 10));

    expect(result).to.be.true;
  });

  it("should not be able to add more crops than a farm's size", () => {
    const result = farm.add(new Crop("mice", 21, 10));

    expect(result).to.be.false;
  });

  it("should be able to add up to the farm size", () => {
    farm.add(new Crop("ferret", 10, 10 ));
    const result = farm.add(new Crop("weasel", 10, 10 ));

    expect(result).to.be.true;
  });

  it("should not be able to add over the farm size", () => {
    farm.add(new Crop("ferret", 10, 10 ));
    const result = farm.add(new Crop("weasel", 12, 10 ));

    expect(result).to.be.false;
  });

  it("should get a value of 0 with no crops", () => {
    expect(farm.getTotalSellPrice()).to.equal(0);
  });

  it("should be able to get the value of the added crops", () => {
    farm.add(new Crop("mongoose", 4, 4 ));
    farm.add(new Crop("meerkat", 10, 23 ));

    expect(farm.getTotalSellPrice()).to.equal(246);
  });

});