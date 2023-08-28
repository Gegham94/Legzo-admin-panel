export type Traffic = {
  name: string;
  email: string;
  activity: string[];
  country_code: string;
  group_name: string;
  ip: string;
  chats_count: number;
  last_page: {
    title: string;
    url: string;
  };
  login: string;
  customer_id: string;
  prefs: {
    browser: string;
    os: string;
    geolocation: {
      city: string;
    };
  };
};

export type TrafficFilter = {
  id: string;
  label: string;
  icon: string;
  used: boolean;
  isOpen: boolean;
  params: TrafficFilterParams;
};

export type TrafficFilterParams = {
  is?: string[];
  isNot?: string[] | number[];
  isExactly?: string[] | number[];
  contains?: string[];
  doesNotContains?: string[];
  hasAnyValue?: boolean[];
  ip?: string[];
  isTrue?: boolean[];
  isFalse?: boolean[];
  isGreaterThan?: number[] | number[];
  isGreaterOrEqual?: number[] | number[];
  isLessThan?: number[] | number[];
  isLessOrEqual?: number[] | number[];
  isBetween?: number[] | number[];
  key: string;
};
