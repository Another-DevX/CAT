import { NextResponse } from "next/server";

const CATS = [
    {
        name:'idk',
        symbol:'SYM',
        description:'some description about bla bla bla',
        image:'https://placekitten.com/400/300',
        maxSuply:900,
    },
    {
        name:'idk2',
        symbol:'DOT',
        description:'some description about bla bla bla',
        image:'https://placekitten.com/400/300',
        maxSuply:30,
    },
    {
        name:'idk3',
        symbol:'VEV',
        description:'some description about bla bla bla',
        image:'https://placekitten.com/400/300',
        maxSuply:240,
    },
    {
        name:'idk4',
        symbol:'YUP',
        description:'some description about bla bla bla',
        image:'https://placekitten.com/400/300',
        maxSuply:700,
    },
    {
        name:'idk5',
        symbol:'ETH',
        description:'some description about bla bla bla',
        image:'https://placekitten.com/400/300',
        maxSuply:9300,
    },
]

export async function GET(){
    return NextResponse.json({CATS},{status:200})
}