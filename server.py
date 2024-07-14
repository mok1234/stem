from flask import Flask,request,send_from_directory
import mysql.connector
import os
from dotenv import load_dotenv
from flask_cors import CORS
import base64
load_dotenv()
password = os.getenv("PASSWORD")
user = os.getenv("USER")
mydb = mysql.connector.connect(
  host="localhost",
  user=user,
  password=password,
  database= "Test"
)
cursor =mydb.cursor()

# cursor.execute("CREATE TABLE Student (firstname VARCHAR(75),lastname VARCHAR(75),class smallint UNSIGNED,room smallint UNSIGNED,money int,credit int,cardID VARCHAR(15),studentID int PRIMARY KEY)")
# cursor.execute("CREATE TABLE Card (studentID int,cardID VARCHAR(15) PRIMARY KEY)")
# cursor.execute("INSERT INTO Student (firstname,lastname,studentID) VALUES (%s,%s,%d)",("สุทิวัส","เดชเดชะสุนันท์",6112))  
# cursor.execute("INSERT INTO Card (cardID,studentID) VALUES ('1234567890',6112)")  
# cursor.execute("DELETE FROM Card WHERE studentID = '1234567890';")
# cursor.execute("SELECT * FROM Student")
# for i in cursor:
#   print(i)
# print(cursor.fetchall()[0][0])
# print("INSERT INTO Student VALUES ('%s','%s',%d,%d,0,0,'%s',%d);"%("Sutiwat","Dachdachasunun",6,3,'1234567890',6112))
# cursor.execute("INSERT INTO Student VALUES ('%s','%s',%d,%d,0,0,'%s',%d);"%("Sutiwat","Dachdachasunun",6,3,'1234567890',6112))
# mydb.commit()
# cursor.execute("SELECT * FROM Student")
# for i in cursor:
#   print(i)

def saveimg(path,file,name):
  p = "C:\\Users\\mokgg\\Desktop\\stem\\image\\"+path;
  filepath = os.path.join(p, name+".jpeg")
  if(file):
    file_content = base64.b64decode(file)
    with open(filepath, 'wb') as file:
      file.write(file_content)
  return name+".jpeg"
  
app = Flask(__name__)
CORS(app)
@app.route("/user",methods =['POST','PUT','DELETE',"UPDATE"])
def abc():
  body = request.json
  if(request.method=="PUT"):
    sid = int(body['studentID'])
    cardid = body['cardID']
    cursor.execute("SELECT * FROM Student WHERE studentID = %d"%(sid))
    op = cursor.fetchall()
    cursor.execute("SELECT * FROM Card WHERE cardID = '%s'"%(cardid))
    card = cursor.fetchall()
    image = saveimg("student",body["image"],body["studentID"])
    if(len(card)==0):
      cursor.execute("INSERT INTO Card VALUES (%d,'%s')"%(sid,cardid))
    else:
      return {"message" : "cardUsed"}
    if(len(op)==0):
      cursor.execute("INSERT INTO Student VALUES ('%s','%s',%d,%d,0,0,'%s',%d);"%(body['firstname'],body['lastname'],int(body['class']),int(body['room']),body['cardID'],int(sid)))
      mydb.commit()
      return {"message" : "added"}
    cursor.execute("UPDATE Student SET cardID = '%s' WHERE studentID = %d"%(cardid,sid))
    mydb.commit()
    return {"message" : "Update card complete"}
  elif(request.method=="POST"):
    cardid = body['cardID']
    value = body['Value']
    cursor.execute("SELECT * FROM Card WHERE cardID = '%s'"%(cardid))
    card = cursor.fetchall()
    if(len(card)==0):
      return {"message" : "Error Card not Register"}
    cursor.execute("SELECT money,credit,cardID FROM Student WHERE studentID = %d"%(card[0][0]))
    data = cursor.fetchall()
    if(data[0][2]!=cardid):
      return {"message" : "Card have been changed"}
    credit = int(data[0][1])
    money = int(data[0][0])
    if(credit+money<value):
      return {"message" : "Not Enough money"}
    credit-=value
    if(credit<0):
      money+=credit
      credit=0
    cursor.execute("UPDATE Student SET money = %d,credit=%d WHERE studentID = %d"%(money,credit,sid))
    mydb.commit()
    return {"message" : "Pay Complete"}
  elif(request.method=="DELETE"):
    if(body['cardID']):
      cursor.execute("DELETE FROM Card Where cardID = '%s'"%body['cardID'])
    if(body['studentID']):
      cursor.execute("UPDATE Student SET cardID = NULL WHERE studentID = %d"%(int(body['studentID'])))
    mydb.commit()
    return {"message":"Delete Complete"}

@app.route("/product/<filename>")
def get_image(filename):
  try:
    return send_from_directory(r"C:\Users\mokgg\Desktop\stem\image\product", filename)
  except FileNotFoundError:
    return {"error": "File not found"}
  
@app.route("/user/<filename>")
def image(filename):
  try:
    return send_from_directory(r"C:\Users\mokgg\Desktop\stem\image\student", filename)
  except FileNotFoundError:
    return {"error": "File not found"}


@app.route("/product", methods=["GET","PUT","DELETE"])
def Product():
  if(request.method=="GET"):
    cursor.execute("SELECT * FROM Product")
    data = list(cursor.fetchall())
    return {"data":data}
  body = request.json 
  if(request.method=="PUT"):
    image =body["image"]
    cursor.execute("INSERT INTO Product (Pname,price) VALUES ('%s',%d)"%(body["Pname"],int(body["price"])))
    mydb.commit()
    cursor.execute("SELECT MAX(Pid) AS mx FROM Product")
    mx = cursor.fetchall()[0]
    if(not mx[0]):
      mx=0
    else:
      mx=mx[0];
    print(mx)
    path = saveimg("product",image,str(mx))
    return {"message":"Success"}
  elif(request.method=="DELETE"):
    cursor.execute("DELETE FROM Product Where Pid=%d"%(int(body['Pid'])))
    os.remove("C:\\Users\\mokgg\\Desktop\\stem\\image\\product\\%s"%(body["Pid"])+".jpeg")
    mydb.commit()
    return {"message":"Success"}
if(__name__=="__main__"):
  app.run(debug=True)