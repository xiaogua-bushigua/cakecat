### 👉 a web3d project based on react-three-fiber

### 🗝️ react-three-fiber, react-three-postprocessing, gsap, blender

### 🎞️ online video: 

### ⚒️ npm install --force, npm run dev



### blender UV展开烘焙

- blender版本：3.6.4

- UV 展开之前注意事项
  1. 建模完之后，先应用修改器；应用位置，缩放和旋转

  2. 展开之前，去除那些物体里不重要的底面/接触面

  3. 有些面的法线方向可能有问题，这会导致烘焙时此处是全黑，需要改变法线方向

  4. 在编辑模型下放缩物体

- UV 展开步骤
  1. 在下方调出UV编辑器窗口

  2. 选中物体进入编辑模式，面选择模式下按a选择所有面

  3. 按u使用智能UV展开

  4. 在UV编辑窗口对展开的UV按S,G,R进行放缩，平移，旋转以合理排布

  5. 烘焙的结果将会超出每一个UV块的边界，在烘焙前调整它们的位置，尽量让UV块有一些间隔

  6. 对每一个物体都重复以上操作

- 贴图烘焙步骤
  1. 返回物体模式，在UV编辑区新建图像，4096*4096(尽可能大一些)，color：白色，不要alhpa，生成类型选择blank，选择32-bit float

  2. 选择一个物体，进入材质编辑器，勾选use nodes；创建纹理节点-图像纹理，图像选择之前保存的纹理图片；选中该新建的节点

  3. 渲染属性里选择cycles；渲染采样256以上；找到 bake，margin选16px，取消勾选clear image，点击bake

  4. 继续选中别的物体重复上述操作

- 导出
  1. 导出除了相机光源外的所有模型，保存为glb

  2. 在UV编辑器里找到烘焙的图像，保存为jpg