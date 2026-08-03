
import { useAdminStore } from "../AdminState";
import { PassengerCoordinator } from "@/features/passenger/PassengerCoordinator/PassengerCoordinator";

export class AdminCoordinatorClass {
  private static instance: AdminCoordinatorClass;

  private constructor() {}

  public static getInstance(): AdminCoordinatorClass {
    if (!AdminCoordinatorClass.instance) {
      AdminCoordinatorClass.instance = new AdminCoordinatorClass();
    }
    return AdminCoordinatorClass.instance;
  }

  public setPaused(isPaused: boolean): void {
    useAdminStore.getState().setPaused(isPaused);
  }

  public setSpeed(speed: number): void {
    useAdminStore.getState().setSpeed(speed);
  }

  public setWeather(weather: "clear" | "rain" | "fog"): void {
    useAdminStore.getState().setWeather(weather);
  }

  public toggleNightMode(isNight: boolean): void {
    useAdminStore.getState().setNightMode(isNight);
  }

  // Camera views
  public focusCityOverview(): void {
    PassengerCoordinator.resetCamera();
  }

  public focusDepot(): void {
    PassengerCoordinator.handleCameraModeChange("fixed");
  }

  public focusVehicle(busId: string): void {
    useAdminStore.getState().selectVehicle(busId);
    PassengerCoordinator.handleBusSelect(busId);
  }

  public clearVehicleFocus(): void {
    useAdminStore.getState().selectVehicle(null);
    PassengerCoordinator.handleBusSelect(null);
  }
}

export const AdminCoordinator = AdminCoordinatorClass.getInstance();
