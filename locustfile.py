import random
from locust import HttpUser, task, between

class VisitorUser(HttpUser):
    # 模拟用户在页面停留 1 到 5 秒
    wait_time = between(1, 5)
    
    # 设置 host，如果在命令行未指定，默认使用此地址
    # 注意：实际运行时建议通过命令行参数 --host 指定
    # host = "http://47.122.63.229:5055" 
    # locust -f locustfile.py --host https://mi.pku.edu.cn/

    @task
    def load_gallery_images(self):
        """
        模拟游客访问画廊页面，获取图片列表并加载图片
        """
        # 1. 请求图片列表接口
        # 对应前端代码: url = `${API_BASE}/?format=json&era=${eraParam}&search=${this.searchText}&page=${this.currentPage}&seed=${seed}`;
        # 游客模式下会追加 &tourists=true
        
        # 随机生成一个 seed，模拟前端行为
        seed = random.random()
        
        # 构造列表请求 URL
        # 注意：这里假设 host 已经是 http://47.122.63.229:5055，所以路径从 /api 开始
        list_url = f"/api/?format=json&era=&search=&page=1&seed={seed}&tourists=true"
        
        with self.client.get(list_url, catch_response=True, name="/api/ (Get List)") as response:
            if response.status_code == 200:
                try:
                    data = response.json()
                    artworks = data.get("artworks", [])
                    
                    # 2. 遍历列表，请求每一张图片
                    # 前端代码: imgs: `${API_BASE}/${item.path}`
                    for item in artworks:
                        image_path = item.get("path")
                        if image_path:
                            # 构造图片请求 URL
                            # 假设 item.path 类似于 "images/xxx.jpg"
                            # 完整路径为 /api/images/xxx.jpg
                            image_url = f"/api/{image_path}"
                            
                            # 请求图片
                            # 使用 name 参数聚合统计，避免每个图片 URL 单独占一行统计
                            self.client.get(image_url, name="/api/images/[id].jpg")
                            
                except Exception as e:
                    response.failure(f"Failed to parse JSON or fetch images: {e}")
            else:
                response.failure(f"List API failed with status {response.status_code}")

if __name__ == "__main__":
    # 这是一个方便调试的入口，实际压测请使用 locust 命令
    # 例如: locust -f locustfile.py --host https://mi.pku.edu.cn/
    pass

