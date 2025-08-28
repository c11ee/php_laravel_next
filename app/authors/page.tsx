"use client";
import { useEffect, useState } from "react";
import {
  authorsApi,
  createAuthorApi,
  updateAuthorApi,
  deleteAuthorApi,
} from "@/services/common";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Plus, Edit, Delete, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";

// 定义作者类型
interface Author {
  id: number;
  Author_Name: string;
  created_at: string;
  updated_at: string;
}

export default function Author() {
  // 状态管理
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [modalError, setModalError] = useState("");
  const searchParams = useSearchParams();
  // 分页
  const currentPage = Number(searchParams.get("page")) || 1;

  // 总数
  const [total, setTotal] = useState(0);
  const pageSize = Number(searchParams.get("pageSize")) || 2;

  useEffect(() => {
    fetchAuthors(currentPage, pageSize);
  }, [currentPage, pageSize]);

  // 获取作者列表
  const fetchAuthors = async (page: number, pageSize: number) => {
    try {
      setLoading(true);
      const response = await authorsApi({
        Author_Name: searchTerm,
        page: page,
        limit: pageSize,
      });
      setAuthors(response.data.data);
      setError("");
      setTotal(response.data.total);
    } catch (err) {
      setError("获取作者数据失败");
      console.error("Failed to fetch authors:", err);
    } finally {
      setLoading(false);
    }
  };

  // 打开添加作者弹窗
  const handleAddAuthor = () => {
    setEditingAuthor(null);
    setAuthorName("");
    setModalError("");
    setIsModalOpen(true);
  };

  // 打开编辑作者弹窗
  const handleEditAuthor = (id: number) => {
    const author = authors.find((a) => a.id === id);
    if (author) {
      setEditingAuthor(author);
      setAuthorName(author.Author_Name);
      setModalError("");
      setIsModalOpen(true);
    }
  };

  // 删除作者
  const handleDeleteAuthor = async (id: number) => {
    if (window.confirm("确定要删除这个作者吗？")) {
      try {
        // 这里假设 API 提供了删除作者的接口
        await deleteAuthorApi(id);
        // 不重新调用 API，前端删除对应数据
        setAuthors(authors.filter((author) => author.id !== id));
      } catch (err) {
        setError("删除作者失败");
        console.error("Failed to delete author:", err);
      }
    }
  };

  // 保存作者（添加或更新）
  const handleSaveAuthor = async () => {
    // if (!authorName.trim()) {
    //     setModalError('作者名称不能为空');
    //     return;
    // }

    try {
      if (editingAuthor) {
        // 更新作者
        updateAuthorApi(editingAuthor.id, authorName).then((response) => {
          // 不调用接口，替换对应数据
          setAuthors(
            authors.map((author) =>
              author.id === editingAuthor.id ? response.data : author
            )
          );
          // 关闭弹窗并刷新列表
          setIsModalOpen(false);
        });
      } else {
        // 添加新作者
        createAuthorApi(authorName).then((response) => {
          // 不调用接口，添加到列表
          setAuthors([...authors, response.data]);
          // 关闭弹窗并刷新列表
          setIsModalOpen(false);
        });
      }
    } catch (err) {
      setModalError(editingAuthor ? "更新作者失败" : "添加作者失败");
      console.error("Failed to save author:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            作者管理
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 搜索和添加按钮区域 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="搜索作者..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* 搜索按钮 */}
              <Button
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={() => fetchAuthors(1, pageSize)}
              >
                <X className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
            <Button
              className="flex items-center gap-2"
              onClick={handleAddAuthor}
            >
              <Plus size={16} />
              添加作者
            </Button>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mb-4 text-red-500 font-medium">{error}</div>
          )}

          {/* 加载状态 */}
          {loading ? (
            <div className="text-center py-8">加载中...</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">作者名称</TableHead>
                    <TableHead className="font-semibold">创建时间</TableHead>
                    <TableHead className="font-semibold">更新时间</TableHead>
                    <TableHead className="font-semibold">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {authors.length > 0 ? (
                    authors.map((author) => (
                      <TableRow key={author.id} className="hover:bg-gray-50">
                        <TableCell>{author.id}</TableCell>
                        <TableCell>{author.Author_Name}</TableCell>
                        <TableCell>{author.created_at || "无"}</TableCell>
                        <TableCell>{author.updated_at || "无"}</TableCell>
                        <TableCell className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600"
                            onClick={() => handleEditAuthor(author.id)}
                          >
                            <Edit size={14} />
                            编辑
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleDeleteAuthor(author.id)}
                          >
                            <Delete size={14} />
                            删除
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-gray-500"
                      >
                        没有找到匹配的作者
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {/* 分页 */}
              <PaginationWithLinks
                page={currentPage}
                pageSize={pageSize}
                totalCount={total}
                pageSizeSelectOptions={{
                  pageSizeOptions: [2, 5, 10, 25, 50],
                }}
              />
              {/* <PaginationWithLinks
                total={total}
                pageSize={2}
                currentPage={currentPage}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  fetchAuthors();
                }}
              /> */}
            </>
          )}
        </CardContent>
      </Card>

      {/* 作者弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{editingAuthor ? "编辑作者" : "添加作者"}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {modalError && (
                <div className="text-red-500 font-medium">{modalError}</div>
              )}
              <div className="space-y-2">
                <label
                  htmlFor="authorName"
                  className="block text-sm font-medium"
                >
                  作者名称
                </label>
                <Input
                  id="authorName"
                  placeholder="请输入作者名称"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleSaveAuthor}>
                  {editingAuthor ? "更新" : "添加"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
