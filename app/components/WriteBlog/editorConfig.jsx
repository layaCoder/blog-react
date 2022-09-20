import { commands } from "@uiw/react-md-editor";
import { message, Button, Upload, notification } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

import axios from "axios";
import APIS from "../../api/index";

//Axios开启跨域
const instanceAxios = axios.create({
  withCredentials: true,
});

const openNotification = (imgPath) => {
  const key = `open${Date.now()}`;
  const btnClick = function () {
    // to hide notification box
    notification.close(key);
  };
  const btn = (
    <CopyToClipboard
      text={imgPath}
      onCopy={() => {
        message.success("copy to clipboard successed");
      }}
    >
      <Button type="primary" size="small" onClick={btnClick}>
        Copy URL
      </Button>
    </CopyToClipboard>
  );
  notification.open({
    message: "Upload Image successed!",
    description: imgPath,
    btn,
    key,
    onClose: close,
  });
};

export const getToolBarConfig = () => {
  return [
    commands.group(
      [
        commands.title1,
        commands.title2,
        commands.title3,
        commands.title4,
        commands.title5,
        commands.title6,
      ],
      {
        name: "title",
        groupName: "title",
        buttonProps: { "aria-label": "Insert title" },
      }
    ),
    commands.bold,
    commands.codeBlock,
    commands.italic,
    commands.strikethrough,
    commands.hr,
    commands.group,
    commands.divider,
    commands.link,
    commands.quote,
    commands.code,
    commands.image,
    commands.unorderedListCommand,
    commands.orderedListCommand,
    commands.checkedListCommand,
    // commands.codeEdit,
    // commands.codeLive,
    // commands.codePreview,

    // commands.divider,
    commands.group([], {
      name: "update",
      groupName: "update",
      icon: (
        <svg viewBox="0 0 1024 1024" width="12" height="12">
          <path
            fill="currentColor"
            d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z"
          />
        </svg>
      ),
      children: ({ close, execute, getState, textApi }) => {
        return (
          <div style={{ width: 120, padding: 10 }}>
            <Upload
              onChange={(info) => {
                if (info.file.status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (info.file.status === "done") {
                  message.success(
                    `${info.file.name} file uploaded successfully`
                  );
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
              beforeUpload={(file) => {
                // 限制 jpeg格式
                const isJPG = file.type === "image/jpeg";
                const isPNG = file.type === "image/png";
                // const isPNG = file.type === "image/png";
                if (!isJPG && !isPNG) {
                  message.error("You can only upload JPG or PNG file!");
                }
                // 限制图片大小
                const isLt2M = file.size / 1024 / 1024 < 5;
                if (!isLt2M) {
                  message.error("Image must smaller than 5MB!");
                }

                return (isJPG || isPNG) && isLt2M;
              }}
              customRequest={(info) => {
                const formData = new window.FormData();
                formData.append(
                  "file",
                  info.file,
                  // isJPG ? "cover.jpg" : isPNG ? "cover.png" : "unknow"
                  info.name
                );
                instanceAxios({
                  method: "post",
                  url: APIS.saveBlogImage.devUrl,
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  data: formData,
                })
                  .then((res) => {
                    console.log(res.data[0], 25777);
                    if (res.data[0]) {
                      openNotification(res.data[0].imageUrl);
                    } else {
                      console.log(res.data);
                    }
                  })
                  .catch((e) => {
                    console.log("upload img error...>", e);
                  });
              }}
              showUploadList={false}
            >
              <Button
                onClick={() => {
                  close();
                }}
              >
                Upload Img
              </Button>
            </Upload>

            {/* <button type="button" onClick={() => close()}>
              Close
            </button>
            <button type="button" onClick={() => execute()}>
              Execute
            </button> */}
          </div>
        );
      },
      execute: (state, api) => {
        console.log(">>>>>>update>>>>>", state);
      },
      buttonProps: { "aria-label": "Insert title" },
    }),
    // commands.divider,
    // commands.fullscreen,
  ];
};
