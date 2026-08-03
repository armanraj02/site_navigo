import { useDriverStore } from "../DriverState";

export class DriverCoordinatorClass {
  private static instance: DriverCoordinatorClass;

  private constructor() {}

  public static getInstance(): DriverCoordinatorClass {
    if (!DriverCoordinatorClass.instance) {
      DriverCoordinatorClass.instance = new DriverCoordinatorClass();
    }
    return DriverCoordinatorClass.instance;
  }

  public start(): void {
    // 3D engine removed
  }

  public stop(): void {
    // 3D engine removed
  }

  public setCameraMode(mode: "cockpit" | "follow" | "orbit" | "top" | "intersection" | "depot"): void {
    useDriverStore.getState().setCameraMode(mode);
  }
}

export const DriverCoordinator = DriverCoordinatorClass.getInstance();
