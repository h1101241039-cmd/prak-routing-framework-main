// Data statis (Tugas 1 & 2)
const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" }
];

const users = [
  { id: 123, name: "Budi Santoso" }
];

const server = Bun.serve({
  port: 3001, // Ubah port ke 3001 agar bisa jalan bareng Node.js (Tugas 4)
  fetch(request) {
    const startTime = Date.now(); // Middleware: catat waktu mulai (Tugas 3)

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    let response: Response;

    // Routing Halaman Utama
    if (path === '/' && method === 'GET') {
      response = new Response('<h1>Halaman Utama Bun</h1>', { headers: { 'Content-Type': 'text/html' } });
    } 
    // GET /products (Tugas 1)
    else if (path === '/products' && method === 'GET') {
      response = new Response(JSON.stringify(products), { headers: { 'Content-Type': 'application/json' } });
    } 
    // POST /products (Tugas 1)
    else if (path === '/products' && method === 'POST') {
      response = new Response(JSON.stringify({ message: "Produk berhasil ditambahkan (simulasi)" }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } 
    // GET /users/:id (Tugas 2)
    else if (path.startsWith('/users/') && method === 'GET') {
      const parts = path.split('/'); 
      const id = parseInt(parts[2]);
      const user = users.find(u => u.id === id);

      if (user) {
        response = new Response(JSON.stringify(user), { headers: { 'Content-Type': 'application/json' } });
      } else {
        response = new Response(JSON.stringify({ message: "User tidak ditemukan" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }
    } 
    else {
      response = new Response('<h1>404 Halaman Tidak Ditemukan</h1>', { status: 404, headers: { 'Content-Type': 'text/html' } });
    }

    // Middleware: catat waktu selesai dan print log (Tugas 3)
    const duration = Date.now() - startTime;
    console.log(`[Bun] ${method} ${path} - ${duration}ms`);

    return response;
  }
});

console.log(`Server Bun berjalan di http://localhost:${server.port}`);