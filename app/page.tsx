"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  // 模块数据
  const modules = [
    {
      title: "出版社管理",
      description: "帮助您管理出版社信息的增删改查工作",
      buttonText: "进入管理",
      path: "/publisher"
    },
    {
      title: "作者管理",
      description: "帮助您管理作者信息的增删改查工作",
      buttonText: "进入管理",
      path: "/authors"
    },
    {
      title: "书籍管理",
      description: "帮助您管理书籍信息的增删改查工作",
      buttonText: "进入管理",
      path: "/book"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">图书管理系统</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-gray-600 mb-6 flex-grow">{module.description}</p>
                <Button
                  className="self-start flex items-center gap-2"
                  onClick={() => {
                    // 这里可以添加导航逻辑
                    console.log(`导航到 ${module.path}`);
                    router.push(module.path)
                  }}
                >
                  {module.buttonText}
                  <ArrowRight size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
