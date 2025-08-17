import { type Player, world } from "@minecraft/server";

const MSG_TYPE = {
	DEBUG: "debug",
	LOG: "log",
	WARN: "warn",
	ERROR: "error",
} as const;

type MSG_TYPE_KEY = keyof typeof MSG_TYPE;

const CONSOLE_TEXT_COLOR = {
	DEBUG: "\u001b[37m",
	LOG: "\u001b[37m",
	WARN: "\u001b[33m",
	ERROR: "\u001b[31m",
	DEFAULT: "\u001b[0m",
} as const;

type SendMessageProps = {
	message: string;
	type?: MSG_TYPE_KEY;
	player?: Player;
};

/**
 * メッセージのプレフィックスの取得
 *
 * @param type メッセージの種類
 * @returns メッセージのプレフィックス
 */
const getMessagePrefix = (type: MSG_TYPE_KEY) => {
	return `${CONSOLE_TEXT_COLOR[type]}${MSG_TYPE[type]}${CONSOLE_TEXT_COLOR.DEFAULT} `;
};

/**
 * メッセージ送信用関数
 *
 * @param param0.message 送信するメッセージ
 * @param param0.type メッセージの種類
 * @param param0.player 送信するプレイヤー
 */
export const sendMessage = ({ message, type, player }: SendMessageProps) => {
	const messageTarget = player ?? world;
	const messagePrefix = type ? getMessagePrefix(type) : "";
	const formattedMessage = messagePrefix + message;
	messageTarget.sendMessage(formattedMessage);
};
