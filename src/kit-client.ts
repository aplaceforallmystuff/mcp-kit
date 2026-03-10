/**
 * Kit.com API v4 Client (Broadcasts Only)
 * Handles authentication and HTTP requests to the Kit API
 */

const BASE_URL = "https://api.kit.com/v4";

export interface KitClientOptions {
  apiKey: string;
}

export interface PaginationParams {
  after?: string;
  before?: string;
  per_page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    has_previous_page: boolean;
    has_next_page: boolean;
    start_cursor: string | null;
    end_cursor: string | null;
    per_page: number;
  };
}

export class KitClient {
  private apiKey: string;

  constructor(options: KitClientOptions) {
    this.apiKey = options.apiKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const headers: Record<string, string> = {
      "X-Kit-Api-Key": this.apiKey,
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(options.headers as Record<string, string> || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Kit API error (${response.status}): ${errorBody}`);
    }

    return response.json() as Promise<T>;
  }

  // Broadcasts
  async listBroadcasts(params?: PaginationParams): Promise<PaginatedResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    return this.request(`/broadcasts${query ? `?${query}` : ""}`);
  }

  async getBroadcast(id: string): Promise<any> {
    return this.request(`/broadcasts/${id}`);
  }

  async createBroadcast(data: {
    subject: string;
    content?: string;
    description?: string;
    public?: boolean;
    published_at?: string;
    send_at?: string;
    email_template_id?: string;
    thumbnail_alt?: string;
    thumbnail_url?: string;
    preview_text?: string;
  }): Promise<any> {
    return this.request("/broadcasts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateBroadcast(id: string, data: {
    subject?: string;
    content?: string;
    description?: string;
    public?: boolean;
    published_at?: string;
    send_at?: string;
    email_template_id?: string;
    thumbnail_alt?: string;
    thumbnail_url?: string;
    preview_text?: string;
  }): Promise<any> {
    return this.request(`/broadcasts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteBroadcast(id: string): Promise<void> {
    await this.request(`/broadcasts/${id}`, {
      method: "DELETE",
    });
  }
}
