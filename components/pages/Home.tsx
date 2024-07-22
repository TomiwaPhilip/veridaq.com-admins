"use client"
import Image from "next/image"
import { SearchBar, ListCard } from "../shared/shared"
import React, { useState, useEffect } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { getUserDoc } from "@/lib/actions/request.action"
import { BaseFramerAnimation } from "../shared/Animations"
import InfiniteScroll from "react-infinite-scroll-component"

export default function HomePage() {
  interface Documents {
    userName: string
    userType: string
    userId: string
  }
  const [users, setUsers] = useState<Documents[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [userDoc, setUserDoc] = useState<Documents[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchMoreData = () => {
    setTimeout(() => {
      setUsers(userDoc.slice(0, users.length + 1))
    })
    if (users.length === userDoc.length) setHasMore(false)
    else setHasMore(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc1 = await getUserDoc()
        if (doc1) {
          setUserDoc(doc1)
          setUsers(doc1.slice(0, 10))
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching documents:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="bg-[#E1D7E2] mt-[70px]">
      <div className="mr-auto">
        <p className="font-bold text-[28px] text-[#38313A]">
          Your application now has {userDoc.length} users
        </p>
      </div>
      <div className="my-5">
        <SearchBar
          onChange={(e) => {
            const value = e.target.value.toLowerCase()

            // Work Reference Search
            const newUserDocData = userDoc.filter((userDoc) => {
              return userDoc.userName.toLowerCase().includes(value)
            })
            setUsers(newUserDocData)
            setHasMore(false)
            if (value === "") {
              setUsers(userDoc.slice(0, 10))
              if (userDoc.length > 10) {
                setHasMore(true)
              }
            }
          }}
        />
      </div>
      <div className="justify-center mt-[40px] mb-[5rem]">
        {!isLoading ? (
          <BaseFramerAnimation initialY={200}>
            <>
              <InfiniteScroll
                dataLength={users.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  <div className="flex items-center justify-center h-full">
                    <RiLoader4Line className="animate-spin text-2xl mb-4" />
                    <p>Loading...</p>
                  </div>
                }
              >
                {users.length > 0 ? (
                  users.map((doc: Documents) => (
                    <ListCard
                      key={doc.userId}
                      userName={doc.userName}
                      userType={doc.userType}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Image
                      src="/assets/images/error.png"
                      alt="Not Found"
                      width={200}
                      height={200}
                    />
                    <p className="text-center mt-2">No documents found!</p>
                  </div>
                )}
              </InfiniteScroll>
            </>
          </BaseFramerAnimation>
        ) : (
          <div className="flex items-center justify-center h-full">
            <RiLoader4Line className="animate-spin text-2xl mb-4" />
            <p>Loading...</p>
          </div>
        )}
      </div>
    </main>
  )
}
