/**
 * Kit.com API v4 Client
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

  // Account
  async getAccount(): Promise<any> {
    return this.request("/account");
  }

  // Subscribers
  async listSubscribers(params?: PaginationParams & {
    status?: "active" | "inactive" | "bounced" | "complained" | "cancelled";
    created_after?: string;
    created_before?: string;
    updated_after?: string;
    updated_before?: string;
    sort_field?: "created_at" | "updated_at";
    sort_order?: "asc" | "desc";
  }): Promise<PaginatedResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    return this.request(`/subscribers${query ? `?${query}` : ""}`);
  }

  async getSubscriber(id: string): Promise<any> {
    return this.request(`/subscribers/${id}`);
  }

  async createSubscriber(data: {
    email_address: string;
    first_name?: string;
    state?: "active" | "inactive";
    fields?: Record<string, string>;
  }): Promise<any> {
    return this.request("/subscribers", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateSubscriber(id: string, data: {
    email_address?: string;
    first_name?: string;
    fields?: Record<string, string>;
  }): Promise<any> {
    return this.request(`/subscribers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getSubscriberTags(subscriberId: string): Promise<PaginatedResponse<any>> {
    return this.request(`/subscribers/${subscriberId}/tags`);
  }

  async addTagToSubscriber(subscriberId: string, tagId: string): Promise<any> {
    return this.request(`/subscribers/${subscriberId}/tags`, {
      method: "POST",
      body: JSON.stringify({ tag_id: tagId }),
    });
  }

  async removeTagFromSubscriber(subscriberId: string, tagId: string): Promise<void> {
    await this.request(`/subscribers/${subscriberId}/tags/${tagId}`, {
      method: "DELETE",
    });
  }

  // Tags
  async listTags(params?: PaginationParams): Promise<PaginatedResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    return this.request(`/tags${query ? `?${query}` : ""}`);
  }

  async getTag(id: string): Promise<any> {
    return this.request(`/tags/${id}`);
  }

  async createTag(name: string): Promise<any> {
    return this.request("/tags", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  }

  async updateTag(id: string, name: string): Promise<any> {
    return this.request(`/tags/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
    });
  }

  async deleteTag(id: string): Promise<void> {
    await this.request(`/tags/${id}`, {
      method: "DELETE",
    });
  }

  async listTagSubscribers(tagId: string, params?: PaginationParams): Promise<PaginatedResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    return this.request(`/tags/${tagId}/subscribers${query ? `?${query}` : ""}`);
  }

  // Sequences
  async listSequences(params?: PaginationParams): Promise<PaginatedResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    return this.request(`/sequences${query ? `?${query}` : ""}`);
  }

  async getSequence(id: string): Promise<any> {
    return this.request(`/sequences/${id}`);
  }

  async addSubscriberToSequence(sequenceId: string, email: string): Promise<any> {
    return this.request(`/sequences/${sequenceId}/subscribers`, {
      method: "POST",
      body: JSON.stringify({ email_address: email }),
    });
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

  // Forms
  async listForms(params?: PaginationParams & { status?: "active" | "archived" | "trashed" | "all" }): Promise<PaginatedResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    return this.request(`/forms${query ? `?${query}` : ""}`);
  }

  async getForm(id: string): Promise<any> {
    return this.request(`/forms/${id}`);
  }

  async addSubscriberToForm(formId: string, email: string, data?: {
    first_name?: string;
    fields?: Record<string, string>;
  }): Promise<any> {
    return this.request(`/forms/${formId}/subscribers`, {
      method: "POST",
      body: JSON.stringify({ email_address: email, ...data }),
    });
  }

  // Custom Fields
  async listCustomFields(): Promise<PaginatedResponse<any>> {
    return this.request("/custom_fields");
  }

  // Webhooks
  async listWebhooks(params?: PaginationParams): Promise<PaginatedResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    return this.request(`/webhooks${query ? `?${query}` : ""}`);
  }

  async createWebhook(data: {
    target_url: string;
    event: {
      name: string;
      tag_id?: string;
      form_id?: string;
      sequence_id?: string;
      product_id?: string;
    };
  }): Promise<any> {
    return this.request("/webhooks", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteWebhook(id: string): Promise<void> {
    await this.request(`/webhooks/${id}`, {
      method: "DELETE",
    });
  }
}
