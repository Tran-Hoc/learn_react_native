# npm run start

# Redux

Redux is a JS library for predixtable and maintainable global state management.
Redux toolkit is an approach for writing Redux logic.

Store: lưu toàn bộ trạng thái của ứng dụng. Tất cả các dữ liệu từ các component sẽ được lưu trong đây. Thực hiện điều phối xử lý thông tin (state) bằng action và reducer.

Actions: một hành động, các đối tượng mô tả sự kiện (những gì diễn ra trong ứng dụng). sử dụng action để gửi đi trạng thái cần thay đổi, store nhận action và thực hiện thay đổi thông tin được lưu trữ

Reducer: xử lý action. nhận trạng thái hiện tại và action. Sau đó trả về một trạng thái mới.
sao chép state, thực hiện thay đổi trên state đã sao chép.

Dispatch: mọi hoạt động cần thông qua hàm này. Dispatch đảm nhận việc gửi action đến store cho việc xử lý

- example: UI (click chuột) -> gọi dispatch(ation) -> store nhận action chuyển vào Reducer -> reducer nhận state và action, thực hiện tính toán và trả về state mới -> store cập nhật state hiện tại từ kết quả của reducer -> Store đã thay đổi trạng thái . Những UI được kết nối với store thực hiện cập nhật để hiển thị dữ liệu mới.

UI -> Action -> Dispatch -> Store -> Reducer -> Store -> UI.

Provider: bọc component gốc và chuyển vào store để quản lý.

1. Tạo Store: Sử dụng createStore và reducer để tạo một kho dữ liệu duy nhất.

2. Kết nối ứng dụng: Dùng < Provider > để bao bọc toàn bộ ứng dụng và truyền Store vào.

3. Lấy dữ liệu: Trong bất kỳ component nào, sử dụng hook useSelector để lấy dữ liệu từ Store.

4. Thay đổi dữ liệu: Khi có sự kiện xảy ra, sử dụng hook useDispatch để gọi hàm dispatch và gửi một Action tới Store.

5. Cập nhật: Reducer nhận Action, tính toán và trả về một trạng thái mới, sau đó Store được cập nhật.

6. Hiển thị: Component sử dụng useSelector sẽ tự động nhận được trạng thái mới và hiển thị lại giao diện.

---

# AsyncStorage

là một kho lưu trữ bất đồng bộ, khi sử dụng cần async/await.
AsyncStorage.setItem(key, value) dùng để lưu trữ dữ liệu.
AsyncStorage.getItem(key).

Sử dụng useState để quản lý trạng thái của dữ liệu trong component.

Sử dụng useEffect với dependency array trống ([]) để lấy dữ liệu khi component được render lần đầu.

Sử dụng useEffect với dependency array chứa biến ([data]) để lưu dữ liệu mỗi khi biến đó thay đổi.

example:

```
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

function NoteScreen() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem("day1");
        if (value !== null) setData(value);
      } catch (e) {}
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("day2", data);
      } catch (e) {}
    };
    saveData();
  }, [data]);

  return null;
}

export default NoteScreen;
```

---

# formik

form thư viện có sẵn các thành phần hỗ trợ form cho react-react native.
sử dụng: cần truyền các tham số như giá trị khởi tạo, xác thực, hành động khi gửi form.
phần thân có các tham số đầu vào để điều chỉnh form: handleChange, handleBlur, handleSubmit, values, errors, touched. sử dụng các tham số trong text input.
trong phần Text input: secureTextEntry(ẩn đi thông tin nhập vào thành \* )
sủ dụng toán tử điều kiện để hiển thị lỗi cho người dùng phía bên dưới TextInput
```
{errors.email && touched.email && (
    <Text style={styles.error}>{errors.email}</Text>
)}
```


# Yup

thư viện hỗ trợ việc xác thực, và được gọi trong formik.
sử dụng: đặt tên các trường các xác thực, kiểu dữ liệu, điều kiện xác thực(email, min, max, ... )


# Media
sử dụng camera: ImagePicker.launchCameraAsync

lấy hình trong thư viện:  ImagePicker.launchImageLibraryAsync
hàm bất đồng bộ sự dụng async await.


# Authen
sử dụng firebase: mọi thứ đã được setup sẵn trên firebase. 
Khi sử dụng chỉ cần gọi  signInWithEmailAndPassword(auth, email, password); truyền đầy đủ tham số, form từ formik và yup. 

# Navigator
## Stack navigator



