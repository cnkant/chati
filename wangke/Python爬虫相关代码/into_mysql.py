from sqlalchemy import create_engine
from sqlalchemy import Column,Text,Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import scoped_session

engine=create_engine(
    "mysql+pymysql://root:root@127.0.0.1:3306/wangke?charset=utf8",
    pool_size=50,
    max_overflow=20,
    echo=False
)

BASE=declarative_base()

class Answers(BASE):
    __tablename__='answers'
    id=Column(Integer(),primary_key=True,autoincrement=True,nullable=False)
    problem=Column(Text())
    answer=Column(Text())

BASE.metadata.create_all(engine)
session=sessionmaker(engine)
sess_db=scoped_session(session)
