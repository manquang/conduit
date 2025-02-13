"use client";
import { Button, FormProps, Input, Form, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  getSingleArticle,
  postArticle,
  putArticle,
} from "@/actions/handleArticle";
import { capitalizeFirstLetter } from "@/ultis/formatText";
import toast from "react-hot-toast";
import { PlusOutlined } from "@ant-design/icons";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

const UpdateOrAddArticle = ({ slug }: { slug?: string }) => {


  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;
  const [form] = Form.useForm();
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (slug) {

        try {
          const res = await getSingleArticle(slug, token);
          if (res) {
            form.setFieldsValue({
              title: res.data.title,
              description: res.data.description,
              body: res.data.body,
              ...(slug ? {} : { tagList: res.data.tagList || [] }),
            });
            setTags(res.data.tagList || []);
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    })();
  }, [slug, token, form]);

  const saveArticle = async (values: ArticleCredentials) => {
    if (slug) {
      return await putArticle(values, slug, token!!);
    } else {
      return await postArticle(values, token!!);
    }
  };

  const handleFinish: FormProps<ArticleCredentials>["onFinish"] = async (
    values
  ) => {
    if (!slug) {
      values.tagList = tags;
    }

    setLoading(true);
    try {
      const result = await saveArticle(values);
      if (result.success) {
        toast.success("Handle article successfully");
        router.replace(`/article/${result.data.slug}`);
      } else {
        const errors = result.message.errors;
        for (const key in errors) {
          const message = capitalizeFirstLetter(key) + " " + errors[key];
          toast.error(message);
        }
      }
      setLoading(false);
    } catch (error) {
      toast.error("An error occurred while saving the article.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputValue("");
  };

  const handleClose = (removedTag: string) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  return (
    <Form
      form={form}
      name="article-form"
      size="large"
      layout="vertical"
      labelCol={{ span: 6 }}
      style={{ margin: "auto" }}
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      autoComplete="on"
      onKeyDown={(e) => (e.keyCode === 13 ? e.preventDefault() : "")}
    >
      <Form.Item
        name="title"
        label="Article Title"
        rules={[{ required: true, message: "Please enter the article title!" }]}
      >
        <Input placeholder="Article Title" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please enter the article description!" },
        ]}
      >
        <Input placeholder="What's this article about?" />
      </Form.Item>
      <Form.Item
        name="body"
        label="Content"
        rules={[{ required: true, message: "Please enter the article body!" }]}
      >
        <Input.TextArea
          rows={6}
          placeholder="Write your article (in markdown)"
        />
      </Form.Item>
      <Form.Item name="tagList" label="Tags">
        <div>
          <Input
            placeholder="Enter tags"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleInputTag}
            suffix={<PlusOutlined />}
            disabled={slug ? true : false}
          />
          <div className="mt-1 border rounded bg-white p-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <Tag
                  key={tag}
                  closable={slug ? false : true}
                  onClose={() => handleClose(tag)}
                >
                  {tag}
                </Tag>
              ))
            ) : (
              <div className="fw-lighter text-muted">Chosen tags</div>
            )}
          </div>
        </div>
      </Form.Item>

      <Form.Item name="submit">
        <Button type="primary" htmlType="submit" loading={loading}>
          Publish Article
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateOrAddArticle;
