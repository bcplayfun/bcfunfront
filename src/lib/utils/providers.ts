export function sortProviders(array: Array<any>, page = "slots") {
  let hideIds: number[] = [];
  let arrayOfIds: number[] = [];
  if (page === "slots") {
    hideIds = [1, 22, 37, 36, 9, 31, 4, 13, 17, 43, 34, 41, 19, 48];
    arrayOfIds = [
      30, 46, 47, 5, 10, 38, 51, 29, 24, 2, 40, 26, 42, 14, 21, 16, 7, 15, 6,
      20, 28, 49, 50, 39, 35, 8, 44, 32, 33, 3, 27, 45, 11, 23, 12, 25, 18,
    ];
  } else if (page === "live") {
    hideIds = [
      30, 46, 47, 5, 10, 38, 29, 24, 2, 40, 26, 42, 14, 21, 16, 7, 15, 6, 20,
      28, 49, 50, 39, 35, 8, 44, 32, 33, 3, 27, 45, 11, 23, 12, 25, 18, 1, 22,
      37, 36, 9, 34, 19, 41,
    ];
    arrayOfIds = [31, 51, 4, 13, 17, 43, 48];
  }

  let arr = array.filter((obj) => !hideIds.includes(obj.id));

  const sortedArray = [];

  for (const id of arrayOfIds) {
    const matchingObject = arr.find((obj) => obj.id === id);
    if (matchingObject) {
      sortedArray.push(matchingObject);
    }
  }

  for (const obj of arr) {
    if (!arrayOfIds.includes(obj.id)) {
      sortedArray.push(obj);
    }
  }

  return sortedArray;
}

// PragmaticPlay - 30
// BGaming - 5
// Evoplay - 12
// Quickspin - 32
// Thunderkick - 38
// Mascot - 24
// NetGame - 26
// Yggdrasil - 44
// FelixGaming - 14
// Belatra Games - 3
// Caleta - 7
// Fugaso - 15
// Blueprint - 6
// KAGaming -  20
// OneTouch - 28
// TripleCherry - 39
// Dlv - 8
// Kalamba - 21
// RTG SLOTS - 33
// Nucleus - 27
// ZeusPlay - 45
// Espressogames - 11
// MacawGaming - 23
// MPlay - 25
// Igrosoft - 18

// Elbet - 9 - 2games

// Betgames - LIVE - 4
// Ezugi - LIVE - 13
// HoGaming - LIVE - 17
// Vivogaming - LIVE - 43
// XProgaming - 48 - Live

// SmartSoft - MINI - 34
// Turbogames - MINI - 41
// Jetgames - MINI - 19
