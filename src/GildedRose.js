/*
    2006-30-84
    Leeroy was here!!
    
    Leeroy <lerooy@example.com>
*/

function isLegendary(item) {
  const legendaryItemNames = ['Sulfuras, Hand of Ragnaros'];
  return legendaryItemNames.includes(item.name);
}

function isAgingWell(item) {
  return item.name.startsWith('Aged');
}

function isBackstagePass(item) {
  return item.name.startsWith('Backstage passes');
}

function normalizeQualityValue(quality) {
  // The Quality of an item is never more than 50.
  // The Quality of an item is never negative.
  if (quality < 0) {
    return 0;
  }
  if (quality > 50) {
    return 50;
  }
  return quality;
}

function getUpdatedItemQuality(item) {
  if (isLegendary(item)) {
    // Legendary item quality NEVER alters.
    return item.quality;
  }

  if (isAgingWell(item) || isBackstagePass(item)) {
    // Aged item increases in Quality the older it gets.
    let qualityChangeModifier = 1;
    if (item.sellIn <= 10) {
      qualityChangeModifier = 2;
    }
    if (item.sellIn <= 5) {
      qualityChangeModifier = 3;
    }
    if (item.sellIn <= 0) {
      // Quality drops to 0 after the sellIn date.
      return 0;
    }
    return normalizeQualityValue(item.quality + qualityChangeModifier);
  }

  // For other items, once the sell by date has passed, Quality degrades twice as fast.
  let qualityChangeModifier = item.sellIn <= 0 ? 2 : 1;

  return normalizeQualityValue(item.quality - qualityChangeModifier);
}

function getUpdatedSellInValue(item) {
  if (isLegendary(item)) {
    return item.sellIn;
  }
  // Once the sell by date has passed, sellIn decreases twice as fast.
  const changeModifier = item.sellIn < 0 ? 2 : 1;

  return item.sellIn - changeModifier;
}

var GildedRose = function() {
  var items = [];
  items.push(new Item('+5 Dexterity Vest', 10, 20));
  items.push(new Item('Aged Brie', 2, 0));
  items.push(new Item('Elixir of the Mongoose', 5, 7));
  items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
  items.push(new Item('Conjured Mana Cake', 3, 6));
  GildedRose.updateQuality(items);
};

GildedRose.updateQuality = function(items) {
  return items.map(item => ({
    name: item.name,
    quality: getUpdatedItemQuality(item),
    sellIn: getUpdatedSellInValue(item),
  }));
};
