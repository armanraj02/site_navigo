import {
  BusRepository,
  RouteRepository,
  StopRepository,
  JourneyRepository,
  UserRepository,
  NotificationRepository,
  SimulationRepository,
  BusDto,
  RouteDto,
  StopDto,
  JourneyDto,
  UserDto,
  NotificationDto,
} from "../Contracts/Contracts";
import { MANGALURU_ROUTES as MOCK_ROUTES, MANGALURU_STOPS as MOCK_STOPS } from "@/lib/demoData";
import { ServiceRegistry } from "../DependencyInjection/ServiceRegistry";

// -------------------------------------------------------------
// BusRepository Mock Adapter
// -------------------------------------------------------------
export class MockBusRepository implements BusRepository {
  public async getAll(): Promise<BusDto[]> {
    return [];
  }

  public async getById(id: string): Promise<BusDto | null> {
    const list = await this.getAll();
    return list.find((b) => b.id === id) || null;
  }

  public async save(bus: BusDto): Promise<void> {
    // Satisfy unused variables rule
    if (bus) {
      return;
    }
  }
}

// -------------------------------------------------------------
// RouteRepository Mock Adapter
// -------------------------------------------------------------
export class MockRouteRepository implements RouteRepository {
  public async getAll(): Promise<RouteDto[]> {
    return MOCK_ROUTES.map((r) => ({
      id: r.id,
      name: r.originName + " to " + r.destinationName,
      color: "#3b82f6",
      stopIds: [],
      headwayMinutes: 15,
    }));
  }

  public async getById(id: string): Promise<RouteDto | null> {
    const routes = await this.getAll();
    return routes.find((r) => r.id === id) || null;
  }
}

// -------------------------------------------------------------
// StopRepository Mock Adapter
// -------------------------------------------------------------
export class MockStopRepository implements StopRepository {
  public async getAll(): Promise<StopDto[]> {
    return MOCK_STOPS.map((s) => ({
      id: s.id,
      name: s.name,
      position: s.position as [number, number, number],
      routeIds: s.routeIds,
    }));
  }

  public async getById(id: string): Promise<StopDto | null> {
    const stops = await this.getAll();
    return stops.find((s) => s.id === id) || null;
  }
}

// -------------------------------------------------------------
// JourneyRepository Mock Adapter
// -------------------------------------------------------------
export class MockJourneyRepository implements JourneyRepository {
  public async findRoutes(fromStopId: string, toStopId: string): Promise<JourneyDto[]> {
    return [
      {
        id: `J-${fromStopId}-${toStopId}`,
        fromStopId,
        toStopId,
        totalDurationMinutes: 18,
        totalFare: 2.75,
        legsCount: 1,
      },
    ];
  }

  public async saveSearchHistory(userId: string, fromStopId: string, toStopId: string): Promise<void> {
    if (userId && fromStopId && toStopId) {
      return;
    }
  }
}

// -------------------------------------------------------------
// UserRepository Mock Adapter
// -------------------------------------------------------------
export class MockUserRepository implements UserRepository {
  public async getCurrentUser(): Promise<UserDto | null> {
    return {
      id: "USR-001",
      email: "operator@navigo.net",
      name: "Terminal Dispatcher",
      role: "admin",
    };
  }

  public async updateRole(userId: string, role: UserDto["role"]): Promise<void> {
    if (userId && role) {
      return;
    }
  }
}

// -------------------------------------------------------------
// NotificationRepository Mock Adapter
// -------------------------------------------------------------
export class MockNotificationRepository implements NotificationRepository {
  public async getUnread(userId: string): Promise<NotificationDto[]> {
    if (userId) {
      // return default mock alerts
    }
    return [
      {
        id: "alert-mock-1",
        title: "Disruptions Clearance",
        message: "All clear along industrial corridors.",
        priority: "medium",
        timestamp: "12:00",
      },
    ];
  }

  public async markAsRead(id: string): Promise<void> {
    if (id) {
      return;
    }
  }
}

// -------------------------------------------------------------
// SimulationRepository Mock Adapter
// -------------------------------------------------------------
export class MockSimulationRepository implements SimulationRepository {
  public async getClockTime(): Promise<string> {
    return new Date().toLocaleTimeString();
  }

  public async setClockSpeed(speedMultiplier: number): Promise<void> {
    // Clock speed not supported
  }
}

// Register default mock adapters in ServiceRegistry
export const registerMockServices = (): void => {
  ServiceRegistry.register<BusRepository>("BusRepository", new MockBusRepository());
  ServiceRegistry.register<RouteRepository>("RouteRepository", new MockRouteRepository());
  ServiceRegistry.register<StopRepository>("StopRepository", new MockStopRepository());
  ServiceRegistry.register<JourneyRepository>("JourneyRepository", new MockJourneyRepository());
  ServiceRegistry.register<UserRepository>("UserRepository", new MockUserRepository());
  ServiceRegistry.register<NotificationRepository>("NotificationRepository", new MockNotificationRepository());
  ServiceRegistry.register<SimulationRepository>("SimulationRepository", new MockSimulationRepository());
};
