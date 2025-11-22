export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};

export type AppDrawerParams = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type TabsParams = {
  Trails: undefined;
  Assessment: undefined;
  Progress: undefined;
  TrailDetails: { trailId: string };
};

export type RootStackParams = {
  Auth: undefined;
  App: undefined;
};
