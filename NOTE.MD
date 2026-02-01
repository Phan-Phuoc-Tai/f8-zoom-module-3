# 24/01

- 20:40 Commit-1st Create repo, vite. Component: sidebar

# 25/01

- 20:45 Commit-2nd giao diện homePage, explorePage, postCard, exploreItem

- giao diện form-login, loginSchema

# 27/01

- 20:45 Commit-3rd loginSchema, chức năng login, register, verify-email, resend-email , getProfile, authMiddleware, format-time

- lấy danh sách suggest, avatar trên suggest, footer, post chi tiết

# 28/01

- 20:55 Commit-4th suggest user, footer, post detail, like, save, comment, fix refresh-token

# 29/01

- 20:15 Commit-5th create, update, delete post & comment

# 30/1

- forgot password, UI user

1. Luồng chat real-time

- Giao thức http
  client 1 ---> server
  client 1 <--- server

client 1 --(message gửi tới client 2 và 3)--> server

client 1 <--(message từ server gửi về)-- server

client 2
client 3

- Socket.io
  -Khái niệm: Namespace, Room

  -Ví dụ: Có 10 client kết nối real-time tới socket server. Client 1, client 2

- Luồng socket.io
  - Tạo ra Socket Server lắng nghe kết nối(Server)
  - Client thiết lập kết nối tới Socket Server (Client)
    - Kết nối tới const socket = io("")
    - Lắng nghe sự kiện kết nối thành công: socket.on("connect", () => {...})
  - Khi client A muốn gửi tin nhắn cho client B:
    - **Kiểm tra xem A và B có cuộc hội thoại chung với nhau chưa**, nếu chưa thì tạo mới cuộc hội thoại, nếu rồi thì lấy ra cuộc hội thoại đó(client)
      - Sử dụng API Create or Get/...conversations
    - **Lấy ra tấ cả tin nhắn** trong cuộc hội thoại đó(Client)
      - Sử dụng API Get message in conversations
    - **Gửi tin nhắn** text hoặc file từ A tới B (Client)
      - Sử dụng API send Text message, set Image Message
    - **Lắng nghe tin nhắn mới** trong tất cả các cuộc hội thoại(Client)
      - Sử dụng API: Receive new message
      <!-- - socket.emit("send_message", {to: "clientB_id", message: "Hello"}) -->

2. Test API socket.io

- Luồng gửi nhận tin nhắn real-time
  - Cần lưu tin nhắn vào database
  - client A --(http)--------> server
  - client B <--(websocket)--- server

- Luồng gửi nhận **đang gõ bàn** phím real-time
  - Không cần lưu trạng thái đang gõ vào database
  - client A --(websocket)---> server
    - sử dụng API typing indicator - (socket.emit("typing", ...))
  - client B <--(websocket)--- server
    - sử dụng API typing indicator - (socket.on("user-typing", ...))

- Luồng gửi nhận **dừng gõ bàn** phím real-time
  - Không cần lưu trạng thái đang gõ vào database
  - client A --(websocket)---> server
    - sử dụng API typing indicator - (socket.emit("stop_typing", ...))
  - client B <--(websocket)--- server
    - sử dụng API typing indicator - (socket.on("user_stop_typing", ...))
