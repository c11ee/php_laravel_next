import api from "@/lib/axios";

export async function authorsApi(params: any) {
  return api.get("/authors", { params });
}

export async function createAuthorApi(name: string) {
  return api.post("/authors", { Author_Name: name });
}

export async function updateAuthorApi(id: number, name: string) {
  return api.put(`/authors/${id}`, { Author_Name: name });
}

export async function deleteAuthorApi(id: number) {
  return api.delete(`/authors/${id}`);
}
