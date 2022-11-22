
#Installaion guide
- Môi trường react navite: https://reactnative.dev/docs/environment-setup (Nhớ chọn react native cli)
- Install dependencies, chạy lệnh `yarn` trong terminal, với ios thì cần  chạy lệnhk pod  install trong thư mục  ios
- Android
-- react-native run-android
- ios 
-- react-native run-ios

# Presentation
Là thư mục chứa code cho phần UI của app,  phần này bao gồm 
- UI file (TSX): React Native code file, vẽ các component trên màn hình, quy định màu sắc, tương tác với user 
- Presentation files (.hook.ts): chứa các logic, quản lí data cho từng component/màn hình và được ssử dụng bởi  ui file 
- Navigation folder: quy định về flow các màn hình trên app, từ đâu đến đâu
- Resource folder: chứ các constant, shared value trong app
- Shared-state: data sử dụng chung trong app
# Data
- Data source: cung cấp dữ liệu từ nhiều nguồn  (cloud,  local)
- Model: quy định kiểu dữ liệu tra về

# FLow
Ví dụ về luồng hiển thị thông tin chi tiết công việc 
- TaskDetail.tsx sẽ là UI file cho màn hình các công việc, khi người dùng chuyển đến  màn hình công việc thì  TaskLDetail sẽ được  khởi  tạo    
-- Button chuyển tiếp task (1)
- useTaskInfo,ts là file quy định logic, data cho màn hình task detail, sẽ được khởi tạo  cùng màn hình  TaskDetail 
-- function forward: gọi datasource để chuyển tiếp task

=> Khi người dùng ấn vào button (1), Ui sẽ gọi hook để thực hiện action chuyển tiếp task 
