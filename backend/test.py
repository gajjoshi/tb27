import pymongo
MONGOURL="mongodb+srv://deepgada2003:Deepesh1234@tbcluster.gxajf.mongodb.net/?retryWrites=true&w=majority&appName=tbcluster"

client = pymongo.MongoClient(MONGOURL)
db =client['tb27']
print(db.list_collection_names())
col=db['tb27']
print(col.find({}))
