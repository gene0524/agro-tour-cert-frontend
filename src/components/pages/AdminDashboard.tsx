import { useState, MouseEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { FileText, Clock, CheckCircle2, AlertCircle, Search, Filter, Download } from "lucide-react";

interface AdminDashboardProps {
  onNavigate?: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [filters, setFilters] = useState({
    year: "2025",
    city: "all",
    category: "all",
    status: "all",
    search: ""
  });

  const stats = [
    { label: "待審查", value: "12", icon: Clock, color: "text-[#84A98C]", bgColor: "bg-[#84A98C]/10" },
    { label: "補件中", value: "5", icon: AlertCircle, color: "text-[#C94A4A]", bgColor: "bg-[#C94A4A]/10" },
    { label: "已通過", value: "42", icon: CheckCircle2, color: "text-[#1C4A27]", bgColor: "bg-[#1C4A27]/10" },
    { label: "未通過", value: "3", icon: AlertCircle, color: "text-gray-500", bgColor: "bg-gray-100" }
  ];

  // Mock Data - aligned with real options
  const allApplications = [
    {
      id: "AG-2025-001",
      farmName: "綠野休閒農場",
      owner: "王小農",
      city: "宜蘭縣",
      category: "第一類：休閒農場",
      specialty: ["米", "蔬菜"],
      status: "待審查",
      statusColor: "bg-[#84A98C]",
      submitDate: "2025/10/20",
      year: "2025"
    },
    {
      id: "AG-2025-002",
      farmName: "山林生態園區",
      owner: "林大明",
      city: "苗栗縣",
      category: "第二類：農業旅遊經營體",
      specialty: ["林木", "竹林"],
      status: "補件中",
      statusColor: "bg-[#C94A4A]",
      submitDate: "2025/10/18",
      year: "2025"
    },
    {
      id: "AG-2025-003",
      farmName: "海洋漁業體驗館",
      owner: "陳小華",
      city: "高雄市",
      category: "第二類：農業旅遊經營體",
      specialty: ["漁撈", "娛樂漁業"],
      status: "待審查",
      statusColor: "bg-[#84A98C]",
      submitDate: "2025/10/15",
      year: "2025"
    },
    {
      id: "AG-2025-004",
      farmName: "快樂牧場",
      owner: "張小美",
      city: "臺南市",
      category: "第一類：休閒農場",
      specialty: ["畜", "乳製品"],
      status: "已通過",
      statusColor: "bg-[#1C4A27]",
      submitDate: "2025/10/12",
      year: "2025"
    },
    {
      id: "AG-2024-088",
      farmName: "老農夫果園",
      owner: "李老爹",
      city: "臺中市",
      category: "第一類：休閒農場",
      specialty: ["水果"],
      status: "已通過",
      statusColor: "bg-[#1C4A27]",
      submitDate: "2024/11/05",
      year: "2024"
    }
  ];

  // Filter Logic
  const filteredApplications = allApplications.filter(app => {
    if (filters.year !== "all" && app.year !== filters.year) return false;
    if (filters.city !== "all" && app.city !== filters.city) return false;
    if (filters.category !== "all" && !app.category.includes(filters.category)) return false;
    if (filters.status !== "all" && app.status !== filters.status) return false;
    if (filters.search && !app.farmName.includes(filters.search) && !app.owner.includes(filters.search)) return false;
    return true;
  });

  const handleReview = (id: string) => {
    if (onNavigate) {
      // Pass the ID or store it in context/storage before navigating
      // For now just navigate
      onNavigate("admin-review");
    }
  };

  const handleDownloadPdf = (id: string) => {
    // In a real app, this would fetch the PDF URL from backend
    alert(`正在下載案件 ${id} 的原始自評表 PDF...`);
  };

  return (
    <main className="min-h-screen bg-[#F7FAF7]">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-[#1C4A27] mb-2 text-2xl font-bold">審查總覽</h1>
            <p className="text-[#555]">管理與追蹤所有認證申請案件</p>
          </div>
          <Button className="bg-[#1C4A27] text-white hover:bg-[#2A5F38]">
            <FileText className="w-4 h-4 mr-2" />
            匯出報表
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-[#E5EAD9] shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#1C4A27]">{stat.value}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Card */}
        <Card className="border border-[#E5EAD9] shadow-sm">
          <CardHeader className="bg-white border-b border-[#E5EAD9] px-6 py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-[#1C4A27] text-xl">案件列表</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜尋農場或負責人..."
                    className="pl-8 h-9"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#1C4A27]" />
                  <span className="text-sm font-medium text-[#555]">篩選：</span>
                </div>
                
                <Select value={filters.year} onValueChange={(v: string) => setFilters({ ...filters, year: v })}>
                  <SelectTrigger className="w-[100px] h-9 bg-white">
                    <SelectValue placeholder="年份" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有年份</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.city} onValueChange={(v: string) => setFilters({ ...filters, city: v })}>
                  <SelectTrigger className="w-[120px] h-9 bg-white">
                    <SelectValue placeholder="縣市" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有縣市</SelectItem>
                    <SelectItem value="宜蘭縣">宜蘭縣</SelectItem>
                    <SelectItem value="苗栗縣">苗栗縣</SelectItem>
                    <SelectItem value="臺中市">臺中市</SelectItem>
                    <SelectItem value="臺南市">臺南市</SelectItem>
                    <SelectItem value="高雄市">高雄市</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.category} onValueChange={(v: string) => setFilters({ ...filters, category: v })}>
                  <SelectTrigger className="w-[180px] h-9 bg-white">
                    <SelectValue placeholder="申請類別" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有類別</SelectItem>
                    <SelectItem value="第一類">第一類：休閒農場</SelectItem>
                    <SelectItem value="第二類">第二類：農業旅遊</SelectItem>
                    <SelectItem value="第三類">第三類：農業組織</SelectItem>
                    <SelectItem value="第四類">第四類：農村企業</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.status} onValueChange={(v: string) => setFilters({ ...filters, status: v })}>
                  <SelectTrigger className="w-[120px] h-9 bg-white">
                    <SelectValue placeholder="狀態" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有狀態</SelectItem>
                    <SelectItem value="待審查">待審查</SelectItem>
                    <SelectItem value="補件中">補件中</SelectItem>
                    <SelectItem value="已通過">已通過</SelectItem>
                    <SelectItem value="不通過">未通過</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFilters({ year: "all", city: "all", category: "all", status: "all", search: "" })}
                  className="text-gray-500 hover:text-[#1C4A27]"
                >
                  重置
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAF8] hover:bg-[#F8FAF8]">
                  <TableHead className="pl-6 text-[#1C4A27]">申請編號 / 年份</TableHead>
                  <TableHead className="text-[#1C4A27]">農場名稱</TableHead>
                  <TableHead className="text-[#1C4A27]">負責人</TableHead>
                  <TableHead className="text-[#1C4A27]">縣市 / 類別</TableHead>
                  <TableHead className="text-[#1C4A27]">特色 / Plus</TableHead>
                  <TableHead className="text-[#1C4A27]">狀態</TableHead>
                  <TableHead className="text-[#1C4A27]">申請日期</TableHead>
                  <TableHead className="text-[#1C4A27] text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <TableRow key={app.id} className="hover:bg-[#F4F9F6] cursor-pointer" onClick={() => handleReview(app.id)}>
                      <TableCell className="pl-6 font-medium">
                        <div className="flex flex-col">
                          <span className="text-[#333]">{app.id}</span>
                          <span className="text-xs text-gray-400">{app.year}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-[#1C4A27]">{app.farmName}</TableCell>
                      <TableCell className="text-gray-600">{app.owner}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-gray-700">{app.city}</span>
                          <span className="text-xs text-gray-500 truncate max-w-[150px]" title={app.category}>
                            {app.category.split("：")[0]}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {app.specialty.map(s => (
                            <Badge key={s} variant="outline" className="text-xs border-gray-200 text-gray-500 bg-white">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${app.statusColor} text-white border-0`}>
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">{app.submitDate}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-gray-200 text-gray-500 hover:border-[#1C4A27] hover:text-[#1C4A27] hover:bg-[#F4F9F6]"
                            title="下載原始自評表"
                            onClick={(e: MouseEvent) => {
                              e.stopPropagation();
                              handleDownloadPdf(app.id);
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-white border border-[#1C4A27] text-[#1C4A27] hover:bg-[#1C4A27] hover:text-white min-w-[80px]"
                            onClick={(e: MouseEvent) => {
                              e.stopPropagation();
                              handleReview(app.id);
                            }}
                          >
                            {app.status === "待審查" ? "開始審查" : "查看詳情"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                      沒有符合條件的案件
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
