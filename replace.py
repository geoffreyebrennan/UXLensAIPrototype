from pathlib import Path
p = Path("src/App.tsx")
text = p.read_text()
start = '        <div className="mx-auto w-full max-w-[1440px] p-5 sm:p-8">'
end = '      </section>\n    </div>\n    {uploaded && <div className="fixed bottom-5 right-5 flex items-center gap-3 rounded-xl bg-[#274c77] px-4 py-3 text-sm text-white shadow-xl"><Icon name="check" size={17}/>Screenshot queued for analysis<button onClick={() => setUploaded(false)}><Icon name="close" size={16}/></button></div>'
si = text.find(start)
ei = text.find(end, si)
print(si, ei)
if si == -1 or ei == -1:
    raise RuntimeError((si, ei))
new = text[:si] + start + "\n          {renderActiveView()}\n        </div>\n" + text[ei:]
p.write_text(new)
