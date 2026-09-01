export class Api {
  static async get(url: string) {
    console.log("GET", url);
  }

  static async post(
    url: string,
    body: unknown
  ) {
    console.log("POST", url, body);
  }

  static async patch(
    url: string,
    body: unknown
  ) {
    console.log("PATCH", url, body);
  }

  static async delete(url: string) {
    console.log("DELETE", url);
  }
}