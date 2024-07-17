from flask import Flask,request,send_from_directory
import mysql.connector
import os
from dotenv import load_dotenv
from flask_cors import CORS
import base64
import datetime

load_dotenv()
password = os.getenv("PASSWORD")
user = os.getenv("USER")
mydb = mysql.connector.connect(
  host="localhost",
  user=user,
  password=password,
  database= "Test"
)
cursor =mydb.cursor(buffered= True)
def updategrade(body):
  if(body["G11"]==""):
    cursor.execute("UPDATE grade SET G11 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G11 = %s WHERE studentID = %d"%(body["G11"],int(body['studentID'])))
  if(body["G12"]==""):
    cursor.execute("UPDATE grade SET G12 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G12 = %s WHERE studentID = %d"%(body["G12"],int(body['studentID'])))
  if(body["G21"]==""):
    cursor.execute("UPDATE grade SET G21 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G21 = %s WHERE studentID = %d"%(body["G21"],int(body['studentID'])))
  if(body["G22"]==""):
    cursor.execute("UPDATE grade SET G22 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G22 = %s WHERE studentID = %d"%(body["G22"],int(body['studentID'])))
  if(body["G31"]==""):
    cursor.execute("UPDATE grade SET G31 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G31 = %s WHERE studentID = %d"%(body["G31"],int(body['studentID'])))
  if(body["G32"]==""):
    cursor.execute("UPDATE grade SET G32 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G32 = %s WHERE studentID = %d"%(body["G32"],int(body['studentID'])))
  if(body["G41"]==""):
    cursor.execute("UPDATE grade SET G41 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G41 =%s WHERE studentID = %d"%(body["G41"],int(body['studentID'])))
  if(body["G42"]==""):
    cursor.execute("UPDATE grade SET G42 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G42 = %s WHERE studentID = %d"%(body["G42"],int(body['studentID'])))
  if(body["G51"]==""):
    cursor.execute("UPDATE grade SET G51 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G51 = %s WHERE studentID = %d"%(body["G51"],int(body['studentID'])))
  if(body["G52"]==""):
    cursor.execute("UPDATE grade SET G52 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G52 = %s WHERE studentID = %d"%(body["G52"],int(body['studentID'])))
  if(body["G61"]==""):
    cursor.execute("UPDATE grade SET G61 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G61 =%s WHERE studentID = %d"%(body["G61"],int(body['studentID'])))
  if(body["G62"]==""):
    cursor.execute("UPDATE grade SET G62 = null WHERE studentID = %d"%(int(body['studentID'])))
  else:
    cursor.execute("UPDATE grade SET G62 = %s WHERE studentID = %d"%(body["G62"],int(body['studentID'])))
      

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
@app.route("/user",methods =['POST','PUT','DELETE',"PATCH"])
def abc():
  body = request.json
  print(body)
  if(request.method=="PUT"):
    sid = int(body['studentID'])
    cardid = body['cardID']
    cursor.execute("SELECT * FROM Student WHERE studentID = %d"%(sid))
    op = cursor.fetchall()
    if(len(op)!=0):
      return {"message" : "Already Register"}
    cursor.execute("SELECT * FROM Card WHERE cardID = '%s'"%(cardid))
    card = cursor.fetchall()
    print(card)
    if(len(card)==0):
      cursor.execute("INSERT INTO Card VALUES (%d,'%s')"%(sid,cardid))
    else:
      return {"message" : "cardUsed"}
    cursor.execute("INSERT INTO Student VALUES ('%s','%s',%d,%d,0,0,'%s',%d);"%(body['firstname'],body['lastname'],int(body['class']),int(body['room']),body['cardID'],int(sid)))
    cursor.execute("INSERT INTO grade (studentID) VALUES (%d);"%(sid))
    updategrade(body)
    image = saveimg("student",body["image"],body["studentID"])
    mydb.commit()
    return {"message" : "Update card complete"}
  elif(request.method=="POST"):
    if("studentID" in body):
      cursor.execute("SELECT * FROM Student WHERE studentID = %s"%(body["studentID"]))
      student = cursor.fetchall()
      if(len(student)==0):
        return {"message":"this id not register yet"}
      cursor.execute("SELECT date,checktime FROM attendance WHERE studentID = %s"%(body["studentID"]))
      data = cursor.fetchall()
      cursor.execute("SELECT * FROM Works WHERE StudentID = %s"%body['studentID'])
      work = cursor.fetchall()
      cursor.execute("SELECT * FROM grade WHERE studentID = %s"%(body['studentID']))
      grade = cursor.fetchall()
      return {"data":list(student[0]),"attendance":data,"work":work,"grade":grade[0]}
    cursor.execute("SELECT * FROM Card WHERE cardID = %s"%(body["cardID"]))
    card = cursor.fetchall()
    print(card)
    if(len(card)==0):
      return {"message" : "Card not register"}
    cursor.execute("SELECT * FROM Student WHERE studentID = %s"%(card[0][0]))
    student = cursor.fetchall()
    cursor.execute("SELECT date,checktime FROM attendance WHERE studentID = %s"%(card[0][0]))
    data = cursor.fetchall()
    if(student[0][6]!=body["cardID"]):
      return {"message":"Card Have been changed"}
    cursor.execute("SELECT * FROM Works WHERE StudentID = %s"%(card[0][0]))
    work = cursor.fetchall()
    cursor.execute("SELECT * FROM grade WHERE studentID = %s"%(card[0][0]))
    grade = cursor.fetchall()
    return {"data":list(student[0]),"attendance":data,"work":work,"grade":grade[0]}
  elif(request.method=="DELETE"):
    if(body['cardID']):
      cursor.execute("DELETE FROM Card Where cardID = '%s'"%body['cardID'])
    if(body['studentID']):
      cursor.execute("UPDATE Student SET cardID = NULL WHERE studentID = %d"%(int(body['studentID'])))
    mydb.commit()
    return {"message":"Delete Complete"}
  elif(request.method=="PATCH"):
    if(body['studentID']):
      cursor.execute("SELECT * FROM Student WHERE studentID = %s"%(body["studentID"]))
      op = cursor.fetchall()
      if(len(op)==0):
        return {"message" : "Not Register yet"}
      if(body["firstname"]!=""):
        cursor.execute("UPDATE Student SET firstname = '%s' WHERE studentID = %d"%(body["firstname"],int(body['studentID'])))
      if(body["lastname"]!=""):
        cursor.execute("UPDATE Student SET lastname = '%s' WHERE studentID = %d"%(body["lastname"],int(body['studentID'])))
      if(body["room"]!=""):
        cursor.execute("UPDATE Student SET room = '%s' WHERE studentID = %d"%(body["room"],int(body['studentID'])))
      if(body["class"]!=""):
        cursor.execute("UPDATE Student SET class = '%s' WHERE studentID = %d"%(body["class"],int(body['studentID'])))
      if(body["image"]!=""):
        saveimg("student",body["image"],body["studentID"])
      updategrade(body)
      
      mydb.commit();
      
      if(body["cardID"]!=""):
        cursor.execute("SELECT * FROM Card WHERE cardID = '%s'"%(body["cardID"]))
        card = cursor.fetchall()
        if(len(card)!=0 and int(card[0][0]) != int(body["studentID"])):
          return {"message" : "cardUsed"}
        else:
          cursor.execute("INSERT INTO Card VALUES (%s,'%s')"%(body["studentID"],body["cardID"]))
        cursor.execute("UPDATE Card SET studentID = %s WHERE cardID = '%s'"%(body["studentID"],body["cardID"]))
        cursor.execute("UPDATE Student SET cardID = '%s' WHERE studentID = %d"%(body["cardID"],int(body['studentID'])))
        mydb.commit()
      return {"message" : "Update Complete"}
    else:
      return {"message" : "Invalid Input"}
@app.route("/attendance",methods =["POST","PUT"])
def attendance():
  body = request.json
  if(request.method=="PUT"):
    # attendance
    if("studentID" in body):
      sid = body["studentID"]
      cursor.execute("SELECT studentID FROM Student WHERE studentID = '%s'"%(body["studentID"]))
      out = cursor.fetchall()
      if(len(out)==0):
        return  {"message" : "card change or not register yet"}
    else:
      cursor.execute("SELECT studentID FROM Student WHERE cardID = '%s'"%(body["cardID"]))
      out = cursor.fetchall()
      if(len(out)==0):  
        return  {"message" : "card change or not register yet"}
      sid = out[0][0]
    curdate  =datetime.date.today().strftime("%d/%m/%Y")
    cursor.execute("INSERT INTO attendance VALUES ('%s',%s,'%s')"%(curdate,sid,datetime.datetime.now().strftime("%H:%M:%S")))
    mydb.commit()
    cursor.execute("SELECT * FROM attendance WHERE studentID = %s"%(sid))
    data = cursor.fetchall()
    return {"message" : "Check Complete"}
  elif(request.method =="POST"):
    sid = ""
    if("studentID" in body):
      sid = body["studentID"]
      cursor.execute("SELECT studentID FROM Student WHERE studentID = '%s'"%(body["studentID"]))
      out = cursor.fetchall()
      if(len(out)==0):
        return  {"message" : "card change or not register yet"}
    else:
      cursor.execute("SELECT studentID FROM Student WHERE cardID = '%s'"%(body["cardID"]))    
      out = cursor.fetchall()
      if(len(out)==0):
        return  {"message" : "card change or not register yet"}
      sid = out[0][0]
    print(sid)
    cursor.execute("SELECT date,checktime FROM attendance WHERE studentID = %s"%(sid))
    data = cursor.fetchall()
    return {"data" : data}


@app.route("/money",methods =["PUT","PATCH","POST"])
def pay():
  body = request.json
  if(request.method=="PATCH"):
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
    cursor.execute("UPDATE Student SET money = %d,credit=%d WHERE studentID = %d"%(money,credit,card[0][0]))
    mydb.commit()
    return {"message" : "Pay Complete"}
  elif(request.method =="PUT"):
    cursor.execute("SELECT money,credit FROM Student WHERE studentID = %s"%(body["studentID"]))
    student=cursor.fetchall()
    if(len(student)==0):
      return {"message" : "This student hasn't register"}
    money = student[0][0]
    credit = student[0][1]
    if("money" in body):
      money+=int(body["money"])
    if("credit" in body):
      credit+=int(body["credit"])
    cursor.execute("UPDATE Student SET money = %d,credit=%d WHERE studentID = %s"%(money,credit,body["studentID"]))
    mydb.commit()
    return {"message" : "Add complete"}
  elif(request.method =="POST"):
    cursor.execute("SELECT * FROM Card WHERE cardID = %s"%(body["cardID"]))
    card = cursor.fetchall()
    print(card)
    if(len(card)==0):
      return {"message" : "Card not register"}
    cursor.execute("SELECT firstname,lastname,class,room,cardID,studentID,money,credit  FROM Student WHERE studentID = %s"%(card[0][0]))
    student = cursor.fetchall()
    print(student)
    if(student[0][4]!=body["cardID"]):
      return {"message":"Card Have been changed"}
    return {"data":list(student[0])}
  
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

@app.route("/work",methods=["PUT","DELETE"])
def work():
  body = request.json
  if(request.method == "PUT"):
    print(body)
    if("StudentID" in body):
      cursor.execute("INSERT INTO Works (WorkName,DeadLine,Score,StudentID) VALUES ('%s','%s',%s,%s)"%(body["WorkName"],body["DeadLine"],body["Score"],body["StudentID"]))
    else:
      cursor.execute("SELECT studentID FROM Student WHERE room = %s AND class = %s"%(body["Room"],body["Class"]))
      Student = cursor.fetchall()
      for i in Student:
        cursor.execute("INSERT INTO Works (WorkName,DeadLine,Score,StudentID) VALUES ('%s','%s',%s,%d)"%(body["WorkName"],body["DeadLine"],body["Score"],i[0]))
    mydb.commit()
    return {"message" : "add complete"}
  elif(request.method == "DELETE"):
    cursor.execute("DELETE FROM Works WHERE WorkID = %s"%body["WorkID"])
    mydb.commit()
    return {"message" : "delete complete"}

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