export interface IItem {
  id?: string;
  userId: string;
  name: string;
  purchaseDate: Date | string;
  expiryDate: Date | string;
  categoryId: string;
  category?: ICategory;
  storedIn: string;
  quantity: string;
  trashed: Boolean;
  selected?: Boolean;
}

export interface ICategory {
  id?: string;
  // userId: string;
  name: string;
  dateCreated: Date | string;
  pantryDays: number;
  fridgeDays: number;
  freezerDays: number;
  Items?: IItem[];
}

export interface IUser {
  id?: string;
  password: string;
  name: string;
  image?: string;
  email: string;
  //supposed to be date value but it's causing alot of errors on console, to fix in future
  dateJoined: Date | string;
  Items?: IItem[];
  Categories?: ICategory[];
}

export interface IGoogleUser {
  aud: string;
  azp: string;
  email: string;
  email_verified: Boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: number;
}

export interface IToken {
  id: string;
  password: string;
  name: string;
  image: string;
  email: string;
  dateJoined: string;
  iat: number;
  exp: number;
}

export interface IRecipeType {
  id: number;
  name: string;
}

export type IRecipe = {
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  analyzedInstructions?: any[];
  aggregateLikes?: number;
  cheap?: boolean;
  cookingMinutes?: number;
  creditsText?: string;
  cuisines?: string[];
  dairyFree?: boolean;
  diets?: string[];
  dishTypes?: string[];
  extendedIngredients?: any[];
  gaps?: string;
  glutenFree?: boolean;
  healthScore?: number;
  image?: string;
  imageType?: string;
  instructions?: string;
  license?: string;
  lowFodmap?: boolean;
  occasions?: string[];
  originalId?: any;
  preparationMinutes?: number;
  pricePerServing?: number;
  sourceName?: string;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
  summary?: string;
  sustainable?: boolean;
  vegan?: boolean;
  vegetarian?: boolean;
  veryHealthy?: boolean;
  veryPopular?: boolean;
  weightWatcherSmartPoints?: number;
  likes?: number;
  missedIngredientCount?: number;
  usedIngredientCount?: number;
};

interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

interface Property {
  name: string;
  amount: number;
  unit: string;
}

interface Flavonoid {
  name: string;
  amount: number;
  unit: string;
}

interface IngredientNutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: IngredientNutrient[];
}

interface CaloricBreakdown {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
}

interface WeightPerServing {
  amount: number;
  unit: string;
}

export interface IRecipeNutrition {
  nutrients: Nutrient[];
  properties: Property[];
  flavonoids: Flavonoid[];
  ingredients: Ingredient[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
}

interface ISingleNutrition {
  title: string;
  amount: string;
  indented: boolean;
  percentOfDailyNeeds: number;
}

export interface NutritionInfo {
  bad: ISingleNutrition[];
  calories: string;
  carbs: string;
  expires: number;
  fat: string;
  good: ISingleNutrition[];
  isStale: boolean;
  protein: string;
}
