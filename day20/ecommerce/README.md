# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

app/store/index.ts: Cấu hình Redux store và kết hợp cartSlice vào. Đây là bước bắt buộc để Redux có thể hoạt động.

app/components/ProductCard.tsx: Tạo component hiển thị sản phẩm. Component này không cần kết nối với Redux ngay lập tức.

app/screen/ProductList.tsx: Sử dụng ProductCard để hiển thị danh sách sản phẩm và thiết lập điều hướng.

app/screen/ProductDetail.tsx: Tại đây, bạn sẽ sử dụng action addItem từ cartSlice để thêm sản phẩm vào giỏ hàng.

app/components/CartItem.tsx: Tạo component hiển thị một sản phẩm trong giỏ hàng.

app/screen/Cart.tsx: Sử dụng CartItem và các action từ cartSlice để hiển thị và quản lý giỏ hàng.

---