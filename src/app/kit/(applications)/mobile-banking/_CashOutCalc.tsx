"use client"
import React, { useState } from 'react'
import { CreditCard, RefreshCcw } from 'lucide-react'

function parseNum(val: string) {
  const n = parseFloat(val)
  return isNaN(n) ? 0 : n
}

type Field = 'initial' | 'withdraw' | 'closing' | 'receive'

type CashOutCalculatorProps = {
  title: string
  defaultRate: number
  altRate: number
  altLabel: string
}

const CashOutCalculator: React.FC<CashOutCalculatorProps> = ({ title, defaultRate, altRate, altLabel }) => {
  const [initialBalance, setInitialBalance] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [closingBalance, setClosingBalance] = useState('')
  const [receiveCash, setReceiveCash] = useState('')
  const [altChecked, setAltChecked] = useState(false)
  const [lastChanged, setLastChanged] = useState<Field>('initial')
  const [customRate, setCustomRate] = useState<string>('')

  const rate = customRate !== '' ? parseNum(customRate) / 100 : (altChecked ? altRate : defaultRate)

  React.useEffect(() => {
    const init = parseNum(initialBalance)
    const withdraw = parseNum(withdrawAmount)
    const closing = parseNum(closingBalance)
    const receive = parseNum(receiveCash)
    let newWithdraw = withdrawAmount, newClosing = closingBalance, newReceive = receiveCash

    if (lastChanged === 'initial') {
      if (withdrawAmount) {
        newClosing = (init - withdraw).toString()
        newReceive = (withdraw - withdraw * rate > 0 ? (withdraw - withdraw * rate).toFixed(2) : '')
      } else if (closingBalance) {
        newWithdraw = (init - closing).toString()
        const w = parseNum(newWithdraw)
        newReceive = (w - w * rate > 0 ? (w - w * rate).toFixed(2) : '')
      } else if (receiveCash) {
        const w = rate < 1 ? receive / (1 - rate) : 0
        newWithdraw = w > 0 ? w.toFixed(2) : ''
        newClosing = (init - w).toString()
      }
    } else if (lastChanged === 'withdraw') {
      newClosing = (init - withdraw).toString()
      newReceive = (withdraw - withdraw * rate > 0 ? (withdraw - withdraw * rate).toFixed(2) : '')
    } else if (lastChanged === 'closing') {
      newWithdraw = (init - closing).toString()
      const w = parseNum(newWithdraw)
      newReceive = (w - w * rate > 0 ? (w - w * rate).toFixed(2) : '')
    } else if (lastChanged === 'receive') {
      const w = rate < 1 ? receive / (1 - rate) : 0
      newWithdraw = w > 0 ? w.toFixed(2) : ''
      newClosing = (init - w).toString()
    }

    if (newWithdraw !== withdrawAmount) setWithdrawAmount(newWithdraw)
    if (newClosing !== closingBalance) setClosingBalance(newClosing)
    if (newReceive !== receiveCash) setReceiveCash(newReceive)
  // eslint-disable-next-line
  }, [initialBalance, withdrawAmount, closingBalance, receiveCash, rate, lastChanged])

  const handleMaxWithdraw = () => {
    setWithdrawAmount(initialBalance)
    setClosingBalance('0')
    setLastChanged('withdraw')
  }

  const handleReset = () => {
    setInitialBalance('')
    setWithdrawAmount('')
    setClosingBalance('')
    setReceiveCash('')
    setAltChecked(false)
    setCustomRate('')
    setLastChanged('initial')
  }

  const withdraw = parseNum(withdrawAmount)
  const fee = withdraw * rate

  const inputClass =
    "border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-50"

  return (
    <div className="mx-auto max-w-md space-y-4 border border-slate-200 bg-white p-4">
      <div className="mb-1 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center bg-slate-950 text-teal-300">
          <CreditCard className="h-3.5 w-3.5" />
        </div>
        <span className="text-sm font-semibold text-slate-900">{title}</span>
        <button
          onClick={handleReset}
          className="ml-auto p-1 text-slate-400 transition hover:bg-slate-100 hover:text-teal-700"
          title="Reset"
          type="button"
        >
          <RefreshCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        <label className="text-xs font-medium text-slate-600">Initial Balance</label>
        <input
          type="number"
          min="0"
          value={initialBalance}
          onChange={e => { setInitialBalance(e.target.value); setLastChanged('initial') }}
          className={inputClass}
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-slate-600">Withdraw Amount</label>
          <button
            type="button"
            onClick={handleMaxWithdraw}
            className="bg-teal-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-teal-500"
          >
            Max Withdraw
          </button>
        </div>
        <input
          type="number"
          min="0"
          value={withdrawAmount}
          onChange={e => { setWithdrawAmount(e.target.value); setLastChanged('withdraw') }}
          className={inputClass}
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        <label className="text-xs font-medium text-slate-600">Closing Balance</label>
        <input
          type="number"
          min="0"
          value={closingBalance}
          onChange={e => { setClosingBalance(e.target.value); setLastChanged('closing') }}
          className={inputClass}
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        <label className="text-xs font-medium text-slate-600">Receive Cash</label>
        <input
          type="number"
          min="0"
          value={receiveCash}
          onChange={e => { setReceiveCash(e.target.value); setLastChanged('receive') }}
          className={inputClass}
          placeholder="0"
        />
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-4">
        <label className="inline-flex items-center gap-1.5 text-xs text-slate-700">
          <input
            type="checkbox"
            checked={altChecked}
            onChange={e => setAltChecked(e.target.checked)}
            className="h-3.5 w-3.5 accent-teal-600"
          />
          {altLabel}
        </label>
        <span className="flex items-center gap-1 text-xs text-slate-600">
          Charge:
          <input
            type="number"
            min="0"
            step="0.0001"
            value={customRate !== '' ? customRate : ''}
            onChange={e => setCustomRate(e.target.value)}
            placeholder={((altChecked ? altRate : defaultRate) * 100).toFixed(2)}
            className="w-14 border border-slate-200 bg-white px-1 py-0.5 text-right text-xs font-semibold text-slate-900 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-50"
          />
          <span>%</span>
        </span>
      </div>

      <div className="border border-slate-200 bg-slate-50 p-3 text-xs">
        <div className="flex items-center gap-1 text-slate-900">
          <span>Fee :</span>
          <span className="font-semibold text-teal-700">{fee > 0 ? fee.toFixed(4) : '0.0000'} ৳</span>
        </div>
      </div>
    </div>
  )
}

export default CashOutCalculator
