import pandas as pd
import mysql.connector
from mysql.connector import Error

# 参数设置
csv_file_path = 'path_to_your_csv_file.csv'  # CSV文件路径
db_host = 'your_db_host'  # 数据库主机地址
db_user = 'your_db_user'  # 数据库用户名
db_password = 'your_db_password'  # 数据库密码
db_name = 'your_db_name'  # 数据库名
db_table = 'your_table_name'  # 数据库表名

# 读取CSV文件
df = pd.read_csv(csv_file_path)

# 连接MySQL数据库
try:
    connection = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_name
    )
    if connection.is_connected():
        cursor = connection.cursor(dictionary=True)
        
        # 遍历CSV文件中的每一行
        for index, row in df.iterrows():
            sfid = row['SFID']
            # 根据sfid查询数据库
            query = f"SELECT SID FROM {db_table} WHERE SFID = %s"
            cursor.execute(query, (sfid,))
            result = cursor.fetchone()
            
            # 如果数据库中存在对应的sfid，则更新CSV中的SID
            if result:
                df.at[index, 'SID'] = result['SID']
        
        # 更新CSV文件
        df.to_csv(csv_file_path, index=False)
        print("CSV文件已更新。")

except Error as e:
    print("数据库连接失败：", e)
finally:
    if 'connection' in locals() and connection.is_connected():
        cursor.close()
        connection.close()
        print("数据库连接已关闭。")
