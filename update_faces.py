import re
import json
import os

# 설정
update_txt_path = "update.txt"
face_data_files = ["faceData.js", "faceData2.js"]

# 1. update.txt에서 이미지 링크 읽기
with open(update_txt_path, "r", encoding="utf-8") as f:
    links = [url.strip() for url in f.read().split(",") if url.strip()]

# 2. pid 추출 및 매핑
pid_to_urls = {}
for url in links:
    match = re.search(r'p(\d+)_', url)
    if match:
        pid = match.group(1)
        pid_to_urls.setdefault(pid, []).append(url)

# 3. faceData 파일 처리 함수
def process_face_data_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        js_text = f.read()

    start = js_text.find('[')
    end = js_text.rfind(']') + 1
    json_text = js_text[start:end]
    data = json.loads(json_text)

    updated = False
    for item in data:
        pid = item.get("pid")
        if pid in pid_to_urls:
            current = item.get("images", [])
            new_links = pid_to_urls[pid]
            for link in new_links:
                if link not in current:
                    current.append(link)
                    updated = True
            item["images"] = current

    if updated:
        # 백업
        os.rename(filepath, filepath + ".bak")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write("const faceData = ")
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write(";")
        print(f"{filepath} 업데이트 완료.")
        return set(pid_to_urls.keys()) & set(item["pid"] for item in data)
    else:
        print(f"{filepath} 변경 없음.")
        return set()

# 4. 각 파일 처리 및 적용된 pid 추적
processed_pids = set()
for file in face_data_files:
    matched_pids = process_face_data_file(file)
    processed_pids.update(matched_pids)

# 5. 미처리된 pid 확인
unmatched_pids = set(pid_to_urls.keys()) - processed_pids
if unmatched_pids:
    print(f"아래 pid는 어떤 파일에서도 찾을 수 없습니다: {', '.join(unmatched_pids)}")
else:
    print("모든 pid에 대해 이미지가 성공적으로 추가되었습니다.")
